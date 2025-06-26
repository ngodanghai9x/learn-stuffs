Sub RemoveSheets()
Dim ws As Worksheet
Dim mySheet As String

Application.DisplayAlerts = False

For Each ws In ThisWorkbook.Worksheets
    If ws.Name <> "Main" Then
      ws.Delete
    End If
Next ws

Application.DisplayAlerts = True

End Sub

