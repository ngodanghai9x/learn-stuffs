Public Sub UnzipAFile(zippedFileFullName As Variant, unzipToPath As Variant)

Dim ShellApp As Object

'Copy the files & folders from the zip into a folder
    Set ShellApp = CreateObject("Shell.Application")
    ShellApp.Namespace(unzipToPath).CopyHere ShellApp.Namespace(zippedFileFullName).items

End Sub
Public Sub OnUnzipFile()
    Dim FileToOpen As Variant
    Dim sFilePath As String
    Dim sFileName As String
    Dim sFolderName As String
    
    FileToOpen = Application.GetOpenFilename(Title:="Browse for your File & Import", FileFilter:="Zip Files (*.zip), *.zip")
    sFilePath = Left$(FileToOpen, InStrRev(FileToOpen, "\"))
    sFileName = Mid$(FileToOpen, InStrRev(FileToOpen, "\") + 1)
    sFolderName = Replace(sFileName, ".zip", "")
    
    MkDir sFilePath & sFolderName
    
    Call UnzipAFile(FileToOpen, sFilePath & sFolderName)
End Sub
