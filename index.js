function chooseFile() {
    const input = document.createElement("input");
    input.type = "file";
  
    input.onchange = function (e) {
      const file = e.target.files[0];
      loadToPlayer(file);
    };
  
    input.click();
  }
  
  function processLink() {
    const link = document.getElementById("linkInput").value;
    const player = document.getElementById("player");
  
    player.src = link;
    player.load();
  }
  
  function setSongInfo(fileContent) {
    const mp3Tags = new MP3Tag(fileContent);
    mp3Tags.read();
  
    const {
      v1: { title, artist },
      v2: { APIC },
    } = mp3Tags.tags;
    const coverBytes = APIC[0].data;
    const coverUrl =
      "data:image/png;base64," +
      btoa(String.fromCharCode.apply(null, new Uint8Array(coverBytes)));
  
    document.getElementById("song").textContent = title;
    document.getElementById("artist").textContent = artist;
    document.getElementById("cover").src = coverUrl;
  }
  
  function loadToPlayer(file) {
    const player = document.getElementById("player");
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const content = e.target.result;
      setSongInfo(content);
    };
  
    reader.readAsArrayBuffer(file);
  
    player.src = URL.createObjectURL(file);
    player.load();
  }
  
  function initDropzone() {
    const dropzone = document.getElementById("dropzone");
  
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      const file = e.dataTransfer.files[0];
      loadToPlayer(file);
    });
  }
  
  window.onload = () => {
    initDropzone();
  };
  