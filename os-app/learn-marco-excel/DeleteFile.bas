Sub DeleteFile(ByVal FileToDelete As String)
  If FileExists(FileToDelete) Then 'See above
    ' First remove readonly attribute, if set
    SetAttr FileToDelete, vbNormal
    ' Then delete the file
    Kill FileToDelete
  End If
End Sub