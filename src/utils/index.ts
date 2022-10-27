export function selectFiles(contentType: string, multiple: boolean): Promise<File | File[]> {
  return new Promise((resolve) => {
    let input = document.createElement('input')
    input.type = 'file'
    input.multiple = multiple
    input.accept = contentType

    input.onchange = (_) => {
      let files = Array.from(input.files as FileList)
      if (multiple) resolve(files)
      else resolve(files[0])
    }

    input.click()
  })
}
