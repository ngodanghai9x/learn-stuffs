Sub ImportCSVData()

Dim wb As Workbook
Dim wbCSV As Workbook
Dim myPath As String
Dim myFile As Variant
Dim fileType, fileName As String
Dim I As Integer

'Get Target Folder Path From User
 With Application.FileDialog(msoFileDialogFolderPicker)
        .Title = "Select Source Folder"
        .AllowMultiSelect = False
        .Show
'  changed the following line - added the backslash to the path
        myPath = .SelectedItems(1) & "\"
    End With

'Specify file type
  fileType = "*.csv*"

'Target Path with file type
  myFile = Dir(myPath & fileType)

'Add Target Workbook
 Workbooks.Add
'  changed the following line - removed leading space in file name
 ActiveWorkbook.SaveAs fileName:= _
        myPath & "Total Results.xlsm", FileFormat:= _
        xlOpenXMLWorkbookMacroEnabled, CreateBackup:=False
'  changed the following line - removed leading space in file name
Set wb = Workbooks.Open(myPath & "Total Results.xlsm")

'Loop through each Excel file in folder
'  changed the following line - to test myFile against a null string, rather than a value of 0
  Do While myFile <> ""
    fileName = Replace(myFile, ".csv", "")
    Debug.Print fileName
    Worksheets.Add(Before:=Worksheets("Sheet1")).Name = fileName
'changed the following line - from *.csv to myFile ** This was probably what was causing the error
    With ActiveSheet.QueryTables.Add(Connection:="TEXT;" & myPath & myFile _
            , Destination:=ActiveSheet.Range("$A$1"))
            .Name = fileName
            .FieldNames = True
            .RowNumbers = False
            .FillAdjacentFormulas = False
            .PreserveFormatting = True
            .RefreshOnFileOpen = False
            .RefreshStyle = xlInsertDeleteCells
            .SavePassword = False
            .SaveData = True
            .AdjustColumnWidth = True
            .RefreshPeriod = 0
            .TextFilePromptOnRefresh = False
            .TextFilePlatform = 850
            .TextFileStartRow = 1
            .TextFileParseType = xlDelimited
            .TextFileTextQualifier = xlTextQualifierDoubleQuote
            .TextFileConsecutiveDelimiter = False
            .TextFileTabDelimiter = False
            .TextFileSemicolonDelimiter = False
            .TextFileCommaDelimiter = True
            .TextFileSpaceDelimiter = False
            '.TextFileColumnDataTypes = Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, _
            '1)
            .TextFileTrailingMinusNumbers = True
            .Refresh BackgroundQuery:=False    'Error occurs here!
        End With
    I = I + 1
    myFile = Dir
    
  Loop

'Message Box when tasks are completed
  MsgBox "Result Import Complete"

End Sub

Option Explicit
