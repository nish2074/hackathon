function filterCrops() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const cropList = document.getElementById("cropList");
    const crops = cropList.getElementsByClassName("crop");
  
    for (let i = 0; i < crops.length; i++) {
      const a = crops[i].getElementsByTagName("a")[0];
      const txtValue = a.textContent || a.innerText;
      crops[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
  