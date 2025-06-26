Sub CombineCsvFiles()
    Dim xFilesToOpen As Variant
    Dim I As Integer
    Dim xWb As Workbook
    Dim xTempWb As Workbook
    Dim xDelimiter As String
    Dim xScreen As Boolean
    Dim sFilePath As String
    'Dim sFileName As String
    'Dim xObject As Object
    
    On Error GoTo ErrHandler
    
    xScreen = Application.ScreenUpdating
    Application.ScreenUpdating = False
    xDelimiter = "|"
    xFilesToOpen = Application.GetOpenFilename("Text Files (*.csv), *.csv", , "Browse for your Files & Import", , True)
    
    If TypeName(xFilesToOpen) = "Boolean" Then
        MsgBox "No files were selected", , "Message"
        GoTo ExitHandler
    End If
  
    I = 1
    'xObject = CreateObject("scripting.filesystemobject").GetParentFolderName(xFilesToOpen)
    sFilePath = Left$(xFilesToOpen(I), InStrRev(xFilesToOpen(I), "\"))
    'sFileName = Mid$(xFilesToOpen, InStrRev(xFilesToOpen, "\") + 1)
    Debug.Print sFilePath
    'Exit Sub
    
    Set xTempWb = Workbooks.Open(xFilesToOpen(I))
    xTempWb.Sheets(1).Copy
    Set xWb = Application.ActiveWorkbook
    xTempWb.Close False
    
    Do While I < UBound(xFilesToOpen)
        I = I + 1
        Set xTempWb = Workbooks.Open(xFilesToOpen(I))
        xTempWb.Sheets(1).Move , xWb.Sheets(xWb.Sheets.Count)
    Loop
    xWb.Save
    
    Debug.Print xWb.Name
    Debug.Print sFilePath & xWb.Name
    
ExitHandler:
    Application.ScreenUpdating = xScreen
    Set xWb = Nothing
    Set xTempWb = Nothing
    Exit Sub
    
ErrHandler:
    MsgBox Err.Description, , "Error"
    Resume ExitHandler
    
End Sub
