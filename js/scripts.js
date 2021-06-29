  function formataTAF() {
    var tafs = $("#edtTAF").val();
    tafs = tafs.replace(/[\n\r]/g, ' ');

    while (tafs.includes("	"))
      tafs = tafs.replace("	", '');

    while (tafs.includes("= "))
      tafs = tafs.replace(/= /g, '=');
    tafs = tafs.replace(/=/gm, "=\n");
    while (tafs.includes("  "))
      tafs = tafs.replace("  ", ' ');
    tafs = tafs.trimStart();
    $("#edtTAF").val(tafs);

   $("#edtTAF").select();
    document.execCommand('copy');
  }


function automatico () {
  setTimeout(formataTAF, 1000);
}