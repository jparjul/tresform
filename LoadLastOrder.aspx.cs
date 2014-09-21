using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Xml;

public partial class LoadLastOrder : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            string sCliente = Request.QueryString["CardCode"];
            string sLastOrderData = GetLastOrderData(sCliente);

            Response.Clear();
            Response.ContentType = "text/xml";
            Response.Charset = "UTF-8";

            if (!String.IsNullOrEmpty(sLastOrderData))
            {
                XmlDocument xmlDoc = new XmlDocument();

                xmlDoc.LoadXml(sLastOrderData);

                Response.Write(xmlDoc.InnerXml);
            }
            Response.End();
 
        }
    }

    private string GetLastOrderData(string sCliente)
    {
        int i = 0;
        string sSQL = String.Empty;
        SqlConnection oConn = null;
        SqlCommand oCommand = null;
        string sXmlData = String.Empty;

        try
        {
            sSQL = String.Format("select TOP 1 DocDate,DocTotal FROM ORDR WHERE CardCode = '{0}' ORDER BY DocEntry DESC",sCliente);
            oConn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["FERRER"].ToString());
            oConn.Open();
            oCommand = new SqlCommand(sSQL, oConn);

            SqlDataReader oReader = oCommand.ExecuteReader();
            if (oReader.HasRows)
            {
                oReader.Read();
                sXmlData += "<LASTORDER>";
                sXmlData += "<LastDate>" + oReader.GetDateTime(0).ToShortDateString()+ "</LastDate>";
                sXmlData += "<LastTotal>" + oReader.GetDecimal(1).ToString() + "</LastTotal>";
                sXmlData += "</LASTORDER>";

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
        return sXmlData;
 
    }

    


}