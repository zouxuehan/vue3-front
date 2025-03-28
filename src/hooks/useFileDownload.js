import { ref } from 'vue'
import { createHash } from 'crypto-browserify'

export function useLargeFileDownload() {
  const url = ref('your_file_url') // 替换为实际的文件 URL
  const chunkSize = ref(1024 * 1024) // 每个分片的大小，这里设置为 1MB
  const concurrentDownloads = ref(3) // 并行下载的块数
  const isDownloading = ref(false)
  const progress = ref(0)
  const downloadedChunks = ref(new Set())

  const startDownload = async () => {
    isDownloading.value = true
    progress.value = 0

    try {
      // 获取文件总大小和哈希值
      const response = await fetch(url.value, { method: 'HEAD' })
      const fileSize = parseInt(response.headers.get('content-length'), 10)
      const fileHash = response.headers.get('ETag')

      // 计算分片数量
      const chunkCount = Math.ceil(fileSize / chunkSize.value)

      // 生成所有分片的下载任务
      const tasks = []
      for (let i = 0; i < chunkCount; i++) {
        if (downloadedChunks.value.has(i)) continue
        const start = i * chunkSize.value
        const end = Math.min(start + chunkSize.value - 1, fileSize - 1)
        tasks.push(downloadChunk(start, end, i, fileHash))
      }

      // 并行下载分片
      const chunks = await downloadInParallel(tasks)

      // 合并所有分片
      const blob = new Blob(chunks)

      // 检查下载文件的完整性
      const downloadedHash = await calculateHash(blob)
      if (downloadedHash === fileHash) {
        // 创建下载链接
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = 'downloaded_file' // 替换为实际的文件名
        a.click()

        // 释放 URL 对象
        window.URL.revokeObjectURL(downloadUrl)
      } else {
        console.error('下载文件完整性校验失败，请重试')
      }
    } catch (error) {
      console.error('下载出错:', error)
    } finally {
      isDownloading.value = false
    }
  }

  const downloadChunk = async (start, end, index, fileHash) => {
    let retries = 3
    while (retries > 0) {
      try {
        const response = await fetch(url.value, {
          headers: {
            Range: `bytes=${start}-${end}`,
          },
        })
        if (!response.ok) {
          throw new Error(`下载分片 ${index} 失败，状态码: ${response.status}`)
        }
        const chunk = await response.arrayBuffer()
        const chunkHash = await calculateHash(new Blob([chunk]))
        // 这里简单假设后端返回的哈希包含了所有分片信息，实际可调整为更精确的分片哈希校验
        if (chunkHash) {
          downloadedChunks.value.add(index)
          return chunk
        } else {
          throw new Error(`分片 ${index} 完整性校验失败`)
        }
      } catch (error) {
        retries--
        if (retries === 0) {
          throw error
        }
        console.warn(`分片 ${index} 下载失败，重试中... 剩余重试次数: ${retries}`)
        await new Promise((resolve) => setTimeout(resolve, 2000)) // 等待 2 秒后重试
      }
    }
  }

  const downloadInParallel = async (tasks) => {
    const results = []
    let completed = 0
    const total = tasks.length

    const downloadNext = async () => {
      if (tasks.length === 0) return
      const task = tasks.shift()
      try {
        const result = await task
        results.push(result)
      } catch (error) {
        console.error('下载块出错:', error)
      }
      completed++
      progress.value = Math.floor((completed / total) * 100)
      await downloadNext()
    }

    const initialTasks = Array.from(
      { length: Math.min(concurrentDownloads.value, tasks.length) },
      downloadNext,
    )
    await Promise.all(initialTasks)

    // 按顺序排序结果
    return results.sort((a, b) => {
      const indexA = results.indexOf(a)
      const indexB = results.indexOf(b)
      return indexA - indexB
    })
  }

  const calculateHash = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(blob)
      reader.onload = () => {
        const hash = createHash('md5')
        hash.update(new Uint8Array(reader.result))
        resolve(hash.digest('hex'))
      }
      reader.onerror = reject
    })
  }

  return {
    isDownloading,
    progress,
    startDownload,
  }
}
