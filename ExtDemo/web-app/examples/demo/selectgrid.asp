<%
    Response.ContentType = "text/html"
    Response.Charset = "UTF-8"
%>
<%
'����JSON����,�Զ���һЩ�������ݡ���
'����Ĳ�����EXT3.x��ͬ���������������ֶκ�����ʽʹ�����µ����ԡ�
'���������ǲ������ݣ����յĲ���ֻ�õ���start,limit��sorts��dir��ʵ�ʲ��������У���֮����SQL��ORDER BY�Ｔ�ɡ�
start = Request("start")
limit = Request("limit")
'��ѯʱ��ȡ�Ĳ�����
query = Request("query")
If start = "" Then
    start = 0
End If
If limit = "" Then
    limit = 50
End If
sorts = Replace(Trim(Request.Form("sort")),"'","") 
dir = Replace(Trim(Request.Form("dir")),"'","")

'�������ݣ�����ֱ����������ʵ��Ӧ���У�Ӧ�ðѲ�ѯ�����ŵ�SQL����С�
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
'ע�⣬�����counts�൱��Rs.RecordCount,Ҳ���Ǽ�¼������

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