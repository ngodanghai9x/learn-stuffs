Sub combineManySheetIntoOne()
  Dim J As Integer
  On Error Resume Next
  Sheets(1).Select
  Worksheets.Add
  Sheets(1).Name = "TONG HOP"
  Sheets(2).Activate
  Range("A1").EntireRow.Select
  Selection.Copy Destination:=Sheets(1).Range("A1")
  For J = 2 To Sheets.Count
  Sheets(J).Activate
  Range("A1").Select
  Selection.CurrentRegion.Select
  Selection.Offset(1, 0).Resize(Selection.Rows.Count - 1).Select
  Selection.Copy Destination:=Sheets(1).Range("A65536").End(xlUp)(2)
  Next
End Sub