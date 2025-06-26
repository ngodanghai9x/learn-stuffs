Option Explicit

Public thisBook As Workbook
Public errorMsg, msg As String

'Declare API
#If VBA7 Then
    Public Declare PtrSafe Function GetKeyState Lib "user32" (ByVal vKey As Integer) As Integer
#Else
    Public Declare Function GetKeyState Lib "user32" (ByVal vKey As Integer) As Integer
#End If
Const SHIFT_KEY = 16

Function ShiftPressed() As Boolean
'Returns True if shift key is pressed
    ShiftPressed = GetKeyState(SHIFT_KEY) < 0
End Function

Private Function IsTableExists(tableName As String, Optional InWorkbook As Workbook) As Boolean
    If InWorkbook Is Nothing Then Set InWorkbook = ThisWorkbook
    Dim sh As Worksheet
    Dim objTable As ListObject
    
    IsTableExists = False
    For Each sh In InWorkbook.Worksheets
        For Each objTable In sh.ListObjects
            If objTable.Name = tableName Then
                IsTableExists = True
                Exit For
            End If
        Next
    Next
End Function

Private Function sheetExists(sheetToFind As String) As Boolean
    Dim Sheet As Object
    
    For Each Sheet In thisBook.Sheets
        If sheetToFind = Sheet.Name Then
            sheetExists = True
            Exit Function
        End If
    Next Sheet
    sheetExists = False
    Sheets.Add(After:=Sheets(Sheets.Count)).Name = sheetToFind
End Function

Private Function importSheet(ByRef ws As Worksheet) As Boolean
    Dim sSheetName As String, strTableName As String, columnName As String, oldColumnName As String
    Dim objTable As ListObject
    Dim LastRow, LastColumn, columnIndex, rowIndex As Long
    Dim LastOldRow, LastOldColumn, oldColumnIndex As Long
    Dim rngData As Range
    Dim InSheet As Worksheet
    
    'Get last row, last column from import sheet
    With ws.Cells
        LastRow = .Find(What:="*", LookIn:=xlFormulas, LookAt:=xlPart, SearchOrder:=xlByRows, SearchDirection:=xlPrevious).Row
        LastColumn = .Find(What:="*", LookIn:=xlFormulas, LookAt:=xlPart, SearchOrder:=xlByColumns, SearchDirection:=xlPrevious).Column
    End With
        
    importSheet = True
    sSheetName = ws.Name
    strTableName = sSheetName
    
    If sheetExists(sSheetName) Then
    End If
    
    Set InSheet = Sheets(sSheetName)
        
    If Not IsTableExists(strTableName, thisBook) Then
        'Create new table
        ws.UsedRange.Copy
        InSheet.Range("A1").PasteSpecial xlPasteValuesAndNumberFormats, xlPasteSpecialOperationNone
        
        With InSheet
            Set rngData = .Range(Cells(1, 1), Cells(LastRow, LastColumn))
            .ListObjects.Add(xlSrcRange, rngData, , xlYes).Name = strTableName
        End With
    Else
        Set objTable = thisBook.Worksheets(sSheetName).ListObjects(strTableName)
        LastOldColumn = objTable.HeaderRowRange.Columns.Count
        LastOldRow = objTable.DataBodyRange.Rows.Count + 1
        
        'Check existed column
        For oldColumnIndex = 1 To LastOldColumn
            oldColumnName = InSheet.Cells(1, oldColumnIndex)
            For columnIndex = 1 To LastColumn
                columnName = ws.Cells(1, columnIndex)
                If columnName = oldColumnName Then
                    'Copy data
                    ws.Activate
                    ws.Range(Cells(2, columnIndex), Cells(LastRow, columnIndex)).Copy
                    
                    InSheet.Activate
                    InSheet.Cells(2, oldColumnIndex).PasteSpecial xlPasteValuesAndNumberFormats, xlPasteSpecialOperationNone
                    
                    With objTable
                        .Resize .Range.Resize(LastRow, LastOldColumn)
                    End With
                End If
            Next
        Next
        
        'Check If any data exists in the table
        If LastOldRow > LastRow Then
            'Clear Redundant Content from the table
            InSheet.Range(Cells(LastRow + 1, 1), Cells(LastOldRow, LastOldColumn)).ClearContents
        End If
        
    End If
    
    Set rngData = Nothing
    Set InSheet = Nothing
    Set objTable = Nothing
    
ExitFunction:
    importSheet = False
    Exit Function

End Function

Public Sub ImportExcelFile()
    Dim sPath As String, sFileName As String
    Dim wbSrc As Workbook, wsSrc As Worksheet
    Dim bError As Boolean
    Dim FileToOpen As Variant
        
    Set thisBook = ThisWorkbook
    Application.ScreenUpdating = False
    errorMsg = ""
    Do While ShiftPressed()
        DoEvents
    Loop
    
    FileToOpen = Application.GetOpenFilename(Title:="Browse for your File & Import", FileFilter:="Excel Files (*.xls*),*xls*")
    If FileToOpen <> False Then
        Set wbSrc = Workbooks.Open(FileToOpen, ReadOnly:=True)
        thisBook.Activate
        bError = False
        sFileName = wbSrc.Name
        
        For Each wsSrc In wbSrc.Worksheets
            If wsSrc.Name <> "Sheet1" And wsSrc.Name <> "Main" Then
                If Not importSheet(wsSrc) Then bError = True
            End If
        Next wsSrc
        
        Application.CutCopyMode = False
        
        wbSrc.Close SaveChanges:=False
        thisBook.Worksheets("Main").Activate
        thisBook.RefreshAll
        
        msg = "Imported '" & sFileName & "' file ..."
        If errorMsg <> "" Then
            msg = msg & vbCrLf & errorMsg
        End If
        
        MsgBox msg
    Else
        MsgBox "Has no file ..."
    End If
    
    Application.ScreenUpdating = True
End Sub

