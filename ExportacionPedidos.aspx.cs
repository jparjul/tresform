using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Data.SqlClient;

public partial class ExportacionPedidos : System.Web.UI.Page
{
    XmlNodeList xNodePedidos = null;
    XmlNodeList xNodeLineas = null;

    protected void Page_Load(object sender, EventArgs e)
    {
        System.IO.StreamReader reader = new System.IO.StreamReader(Page.Request.InputStream);
        string xmlData = reader.ReadToEnd();

        //Response.Clear();
        //Response.ContentType = "text/xml";
        //Response.Charset = "UTF-8";

        if (!String.IsNullOrEmpty (xmlData.Trim()))
        {

            XmlDocument xdoc = new XmlDocument();
            xmlData = HttpUtility.UrlDecode(xmlData);
            xdoc.LoadXml(xmlData);


            xNodePedidos = xdoc.DocumentElement.SelectNodes("ORDR");
            xNodeLineas = xdoc.DocumentElement.SelectNodes("RDR1");

            string sInserOrderData = InsertPedidos();

            if (sInserOrderData.Trim() != String.Empty)
            {
                sInserOrderData = sInserOrderData.Substring(0, sInserOrderData.Length - 1); 
            }

            Response.Write(sInserOrderData);

        }

         Response.End();
 

    }

    private string InsertPedidos()
    {
        int i = 0;
        string sSQL = String.Empty;
        SqlConnection oConn = null;
        SqlCommand oCommand = null;
        string sxmldata = string.Empty;

        try
        {
            oConn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["PDA"].ToString());
            oConn.Open();
            oCommand = new SqlCommand();
            oCommand.Connection = oConn;
            oCommand.CommandType = System.Data.CommandType.Text;

            foreach (XmlNode xNode in xNodePedidos)  
            {
                int iNewDocNum = GetLastDocNum() + 1;
                string sId = GetElement(xNode,"Id");
                string sCardCode = GetElement(xNode,"CardCode");
                string sDate = GetElement(xNode, "Date");
                string sDueDate = GetElement(xNode, "DueDate");
                string sDir = GetElement(xNode, "Dir");
                string sObs = GetElement(xNode, "Obs");
                double dTotal = Convert.ToDouble (GetElement(xNode, "Total"));

                sSQL = String.Format("INSERT INTO ORDR (DocNum,CardCode,DocDate,DocDueDate,Total,DirEnvio,Observaciones) " +
                       "VALUES ( {0},'{1}',GETDATE(),GETDATE(),0,'{2}','{3}')", iNewDocNum, sCardCode, sDir.Replace("'", "''"), sObs.Replace("'", "''"));
                oCommand.CommandText = sSQL;
                oCommand.ExecuteNonQuery();

                int iLine = 0;
                foreach (XmlNode xNodeLinea in xNodeLineas)
                {
                    if (GetElement(xNodeLinea, "Id") == sId)
                    {
                        string sItemCode = GetElement(xNodeLinea, "Code");
                        string sItemName = GetItemName(sItemCode);
                        double dQuantity = Convert.ToDouble(GetNumericElement(xNodeLinea, "Qty"));
                        double dQuantityFree = Convert.ToDouble(GetNumericElement(xNodeLinea, "Qty0"));
                        double dPrice = Convert.ToDouble(GetNumericElement(xNodeLinea, "Price"));

                        sSQL = String.Format("INSERT INTO RDR1 (DocNum,DocLine,ItemCode,ItemName,Quantity,Quantity0,Price,IVA,PriceIVA) " +
                               "VALUES ( {0},{1},'{2}','{3}',{4},{5},{6},0,0)", iNewDocNum, iLine, sItemCode, sItemName.Replace("'", "''"), dQuantity.ToString().Replace(",", "."), dQuantityFree.ToString().Replace(",", "."), dPrice.ToString().Replace(",", "."));
                        oCommand.CommandText = sSQL;
                        oCommand.ExecuteNonQuery();

                        iLine++;
                    }
                }

                sxmldata += sId + ",";

                 
            }

        }
        catch (Exception ex)
        {
        }
        finally
        {
            if (oConn != null) { oConn.Close(); oConn = null; }
            if (oCommand != null) oCommand = null;
        }
        return sxmldata;
    }

    private string GetElement(XmlNode oNode, string sName)
    {
        string sValue = "";

        try
        {
            sValue = oNode[sName].InnerText.Replace('"', Char.MinValue);
        }
        catch (Exception ex)
        {

        }

        return sValue;
    }

    private string GetNumericElement(XmlNode oNode, string sName)
    {
        string sValue = "";

        try
        {
            sValue = oNode[sName].InnerText.Replace('"', Char.MinValue);
            if (sValue == String.Empty) sValue = "0";

            sValue = sValue.Replace(".", ",");
        }
        catch (Exception ex)
        {

        }

        return sValue;
    }



    private int GetLastDocNum()
    {
        int iLastDocNum = 0;
        string sSQL = String.Empty;
        SqlConnection oConn = null;
        SqlCommand oCommand = null;

        try
        {

                sSQL = "SELECT TOP 1 DocNum FROM ORDR ORDER BY DocNum DESC";
                oConn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["PDA"].ToString());
                oConn.Open();
                oCommand = new SqlCommand(sSQL, oConn);

                SqlDataReader oReader = oCommand.ExecuteReader();
                if (oReader.HasRows)
                {
                    oReader.Read();
                    iLastDocNum = Convert.ToInt32(oReader["DocNum"] );
                }

        }
        catch (Exception ex)
        {
        }
        finally
        {
            if (oConn != null) { oConn.Close(); oConn = null; }
            if (oCommand != null) oCommand = null;
        }
        return iLastDocNum;
    }


    private string GetItemName(string sItemCode)
    {
        string sItemName = String.Empty;
        string sSQL = String.Empty;
        SqlConnection oConn = null;
        SqlCommand oCommand = null;

        try
        {

            sSQL = "SELECT ItemName FROM OITM WHERE ItemCode = '"+ sItemCode +"'";
            oConn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["FERRER"].ToString());
            oConn.Open();
            oCommand = new SqlCommand(sSQL, oConn);

            SqlDataReader oReader = oCommand.ExecuteReader();
            if (oReader.HasRows)
            {
                oReader.Read();
                sItemName = oReader["ItemName"].ToString();
            }

        }
        catch (Exception ex)
        {
        }
        finally
        {
            if (oConn != null) { oConn.Close(); oConn = null; }
            if (oCommand != null) oCommand = null;
        }
        return sItemName;
    }
}