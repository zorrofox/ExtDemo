<%
    Response.ContentType = "text/html"
    Response.Charset = "UTF-8"
%>
<%
'返回JSON数据,自定义一些测试数据。。
'这里的参数与EXT3.x相同，区别在于排序字段和排序方式使用了新的属性。
'由于这里是测试数据，接收的参数只用到了start,limit。sorts和dir在实际操作过程中，将之加入SQL的ORDER BY里即可。
start = Request("start")
limit = Request("limit")
'查询时获取的参数。
query = Request("query")
If start = "" Then
    start = 0
End If
If limit = "" Then
    limit = 50
End If
sorts = Replace(Trim(Request.Form("sort")),"'","") 
dir = Replace(Trim(Request.Form("dir")),"'","")

'测试数据，这里直接输出结果，实际应用中，应该把查询条件放到SQL语句中。
If query = "newstitle" Then
    Echo("{")
    Echo("""total"":")
    Echo("""1")
    Echo(""",""items"":[")
    Echo("{")
    Echo("""title"":""newstitle""")
    Echo(",")
    Echo("""author"":""author""")
    Echo(",")
    Echo("""hits"":""100""")
    Echo(",")
    Echo("""addtime"":"""&Now()&"""")
    Echo("}")
    Echo("]}")
Else
Dim counts:counts=300
'注意，这里的counts相当于Rs.RecordCount,也就是记录总数。

Dim Ls:Ls = Cint(start) + Cint(limit)
If Ls >= counts Then
   Ls = counts
End If

Echo("{")
Echo("""total"":")
Echo(""""&counts&""",")
Echo("""items"":[")
For i = start+1 To Ls
   Echo("{")
   Echo("""id"":"""&i&"""")
   Echo(",")
   Echo("""title"":""newstitle"&i&"""")
   Echo(",")
   Echo("""author"":""author"&i&"""")
   Echo(",")
   Echo("""hits"":"""&i&"""")
   Echo(",")
   Echo("""addtime"":"""&Now()&"""")
   Echo("}")
   If i<Ls Then
     Echo(",")
   End If
Next

Echo("]}")
End If
Function Echo(str)
   Response.Write(str)
End Function
%>