function render() {
  const elements = document.querySelectorAll<HTMLTextAreaElement>('textarea')
  const containsElement = Array.of(...elements).filter(x => x.value.match(/!\[[^\]]+\]\([^\)]+\)/));
  containsElement.forEach((x) => {
    const source = x.value;
    const result = source.replaceAll(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" width="240" />');
    x.value = result;
    console.log('replaced', x);
  });
}

document.onkeydown = function(e: any) {
  if(e.altKey && e.shiftKey && e.metaKey && e.keyCode == 65) {
    render();
  }
}