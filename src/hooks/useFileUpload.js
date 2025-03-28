import { ref } from 'vue'

export function useLargeFileUpload() {
  const selectedFile = ref(null)
  const isUploading = ref(false)
  const progress = ref(0)
  const chunkSize = 1024 * 1024 // 每个分片的大小，这里设置为 1MB
  const uploadUrl = 'http://localhost:3000/upload' // 后端上传接口地址
  const concurrentUploads = 3 // 并行上传的分片数量

  const handleFileSelect = (e) => {
    selectedFile.value = e.target.files[0]
  }

  const startUpload = async () => {
    if (!selectedFile.value) return
    isUploading.value = true
    progress.value = 0

    const fileSize = selectedFile.value.size
    const chunkCount = Math.ceil(fileSize / chunkSize)
    const chunks = []

    for (let i = 0; i < chunkCount; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, fileSize)
      const chunk = selectedFile.value.slice(start, end)
      chunks.push({
        chunk,
        filename: selectedFile.value.name,
        chunkIndex: i,
        totalChunks: chunkCount,
      })
    }

    let completedChunks = 0
    const uploadChunk = async (chunkData) => {
      const formData = new FormData()
      formData.append('chunk', chunkData.chunk)
      formData.append('filename', chunkData.filename)
      formData.append('chunkIndex', chunkData.chunkIndex)
      formData.append('totalChunks', chunkData.totalChunks)

      try {
        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('上传分片失败')
        }
      } catch (error) {
        console.error('上传出错:', error)
      } finally {
        completedChunks++
        progress.value = Math.floor((completedChunks / chunkCount) * 100)
      }
    }

    const uploadNext = async () => {
      if (chunks.length === 0) return
      const chunkData = chunks.shift()
      await uploadChunk(chunkData)
      await uploadNext()
    }

    const initialTasks = Array.from(
      { length: Math.min(concurrentUploads, chunks.length) },
      uploadNext,
    )
    await Promise.all(initialTasks)

    isUploading.value = false
    console.log('文件上传完成')
  }

  return {
    selectedFile,
    isUploading,
    progress,
    handleFileSelect,
    startUpload,
  }
}
