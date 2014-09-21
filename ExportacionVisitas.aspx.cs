using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Data.SqlClient;

public partial class ExportacionVisitas : System.Web.UI.Page
{
    XmlNodeList xNodeVisitas = null;
 

    protected void Page_Load(object sender, EventArgs e)
    {
        System.IO.StreamReader reader = new System.IO.StreamReader(Page.Request.InputStream);
        string xmlData = reader.ReadToEnd();

        if (!String.IsNullOrEmpty(xmlData.Trim()))
        {

            XmlDocument xdoc = new XmlDocument();
            xmlData = HttpUtility.UrlDecode(xmlData);
            xdoc.LoadXml(xmlData);

            xNodeVisitas = xdoc.DocumentElement.SelectNodes("VISITA");

            string sInserOrderData = InsertVisitas();

            if (sInserOrderData.Trim() != String.Empty)
            {
                sInserOrderData = sInserOrderData.Substring(0, sInserOrderData.Length - 1);
            }

            Response.Write(sInserOrderData);
        }

        Response.End();


    }

    private string InsertVisitas()
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

            foreach (XmlNode xNode in xNodeVisitas)
            {
                string sId = GetElement(xNode, "Id");
                string sCardCode = GetElement(xNode, "CardCode");
                string sComments = GetElement(xNode, "Comments");
                string sCreateDate = GetElement(xNode, "CreateDate");
                string sMotivo = GetElement(xNode, "Motivo");
                string sModo = GetElement(xNode, "Modo");
                string sSlpCode = GetElement(xNode, "SlpCode");
                int iPedido = GetElement(xNode, "Pedido") == "1" ? 1 : 0;

                sSQL = String.Format("INSERT INTO VISITS VALUES( {0},'{1}','{2}','{3}',{4},'{5}',GETDATE())", sSlpCode,sCardCode, sComments.Replace ("'","''"), iPedido, sMotivo,sModo);
                oCommand.CommandText = sSQL;
                oCommand.ExecuteNonQuery();


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

    private int GetSAPUser(string sComercial)
    {
        int iSAPUser = 0;
        string sSQL = String.Empty;
        SqlConnection oConn = null;
        SqlCommand oCommand = null;

        try
        {

            sSQL = "SELECT userId FROM OHEM WHERE SalesPrson = " + sComercial;
            oConn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["FERRER"].ToString());
            oConn.Open();
            oCommand = new SqlCommand(sSQL, oConn);

            SqlDataReader oReader = oCommand.ExecuteReader();
            if (oReader.HasRows)
            {
                oReader.Read();
                iSAPUser = oReader.GetInt32(0);
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
        return iSAPUser;
    }
}