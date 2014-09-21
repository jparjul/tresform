using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

public partial class ImportAuxiliares : System.Web.UI.Page
    
{

    public string[,] sMotivos;
    public string[,] sPreguntas;

    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            LoadMotivos();
            LoadPreguntas();
        }
    }

    private void LoadPreguntas()
    {
        int i = 0;
        string sSQL = String.Empty;
        SqlConnection oConn = null;
        SqlCommand oCommand = null;

        try
        {
            int iRows = GetRowNumber("SELECT COUNT(*) FROM [@AX_APP_PREGUNTAS]");
            if (iRows > 0)
            {
                sPreguntas = new String[iRows, 3];

                sSQL = "SELECT Code,U_Pregunta FROM [@AX_APP_PREGUNTAS] ORDER BY Code";
                oConn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["FERRER"].ToString());
                oConn.Open();
                oCommand = new SqlCommand(sSQL, oConn);

                SqlDataReader oReader = oCommand.ExecuteReader();
                while (oReader.Read())
                {
                    sPreguntas[i, 0] = oReader.GetString(0);
                    sPreguntas[i, 1] = oReader.GetString(1);

                    i++;
                }
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
    }

    private void LoadMotivos()
    {
        int i = 0;
        string sSQL = String.Empty;
        SqlConnection oConn = null;
        SqlCommand oCommand = null;

        try
        {
            int iRows = GetRowNumber("SELECT COUNT(*) FROM [@AX_APP_MOTIVOS] WHERE U_AX_ACTIVO = 'Y'");
            if (iRows > 0)
            {
                sMotivos = new String[iRows, 3];

                sSQL = "SELECT Code,U_AX_DESC,U_AX_ORDEN FROM [@AX_APP_MOTIVOS] WHERE U_AX_ACTIVO = 'Y' ORDER BY U_AX_ORDEN";
                oConn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["FERRER"].ToString());
                oConn.Open();
                oCommand = new SqlCommand(sSQL, oConn);

                SqlDataReader oReader = oCommand.ExecuteReader();
                while (oReader.Read())
                {
                    sMotivos[i, 0] = oReader.GetString(0);
                    sMotivos[i, 1] = oReader.GetString(1);
                    sMotivos[i, 2] = oReader.GetInt32(2).ToString();

                    i++;
                }
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
    }

    private int GetRowNumber(string sSQL)
    {
        SqlConnection oConn = null;
        SqlCommand oCommand = null;
        int iCounter =0;

        try
        {
                     
                oConn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["FERRER"].ToString());
                oConn.Open();
                oCommand = new SqlCommand(sSQL, oConn);
                SqlDataReader oReader = oCommand.ExecuteReader();
                oReader.Read();
                iCounter = oReader.GetInt32 (0);

        }
        catch(Exception ex)
        {

        }
        finally
        {
            if (oConn != null) { oConn.Close(); oConn = null;}
            if (oCommand != null) oCommand = null;
        }
        return iCounter;
    }

    
}