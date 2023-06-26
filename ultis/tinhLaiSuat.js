function laiSuat() {
  var input = 50 * 1000 * 1000;
  var laiSuatNam = 4;
  var soThangGui = 1;
  var soThang = 12;
  var newInput = input * (1 + laiSuatNam/1200) ** (soThang/soThangGui);
  console.log("newInput", newInput)
  function tinhLai(input, laiSuatNam, soThangGui) {
    var lai = input * laiSuatNam / 100 * soThangGui / 12;
    // console.log("lai", lai);
    return lai;
  }
  tinhLai(input, laiSuatNam, soThangGui);
  function tinhLaiKep(input, laiSuatNam, soThangGui, soThang) {
    var laiKep = 0;
    for (var i = 0; i < 12 / soThangGui; i++) {
      laiKep = tinhLai(input, laiSuatNam, soThangGui);
      input += tinhLai(input, laiSuatNam, soThangGui);
      console.log(`thang ${i + 1} = `, { laiKep, input });
    }
    return input;
  }
  tinhLaiKep(input, laiSuatNam, soThangGui, soThang);
}

laiSuat();