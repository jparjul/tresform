<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImportAuxiliares.aspx.cs" Inherits="ImportAuxiliares" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">

   <meta name="apple-mobile-web-app-capable" content="yes" />
   <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>

    <link rel="stylesheet" href="jquery.mobile-1.1.0/jquery-mobile-960.min.css" />
    <link rel="stylesheet" href="jquery.mobile-1.1.0/jquery.mobile-1.1.0.min.css" />
    <script src="jquery.mobile-1.1.0/jquery-1.7.1.min.js"></script>

      
    <script src="jquery.mobile-1.1.0/jquery.mobile-1.1.0.min.js"></script>

     <script language="javascript" type="text/javascript" src="SBODatabase.js"></script>


    <script type="text/javascript">

        var myDB;
 

        $("#importaux").live("pageinit", function (event) {

            ImportMotivos();
            ImportPreguntas();

        });

        function ImportMotivos() {
        var i;
            var sCode,sMotivo,sOrden;
            var iImport =0;

            try {

            $.mobile.loadingMessageTextVisible = true;
           $.mobile.showPageLoadingMsg("a", "Procesando Motivos...", false);

                myDB = OpenDatabase(successfunction, errorfunction);

                myDB.transaction(
                    function (transaction) {

                        transaction.executeSql('DELETE  FROM AX_MOTIVOS', [], nullDataHandler, killTransaction);

                        <% if (sMotivos != null)
                        {
                        
                            for (int i=0;i<=sMotivos.GetUpperBound(0);i++)
                             {%>
                            sCode = "<%=sMotivos[i,0]%>";
                            sMotivo = "<%=sMotivos[i,1]%>";
                            sOrden = "<%=sMotivos[i,2]%>";
  

                            transaction.executeSql('INSERT INTO AX_MOTIVOS VALUES  (?, ?, ?)', [sCode, sMotivo, sOrden],
                            nullDataHandler, killTransaction);

                            iImport++;

                        <% }
                        }%>

                        var sMsg = "Se han importado correctamente " + iImport.toString() + " motivos." ; 
                        $('#msg').text(sMsg);
                    }
             );

            }
            catch (e) {
                alert(e);
                errorfunction(e);
            }
        }

        function ImportPreguntas()
        {
        var i;
            var sCode,sMotivo,sOrden;
            var iImport =0;

            try {

            $.mobile.loadingMessageTextVisible = true;
            $.mobile.showPageLoadingMsg("a", "Procesando Preguntas...", false);

                myDB = OpenDatabase(successfunction, errorfunction);

                myDB.transaction(
                    function (transaction) {

                        transaction.executeSql('DELETE  FROM AX_PREGUNTAS', [], nullDataHandler, killTransaction);

                        <% if (sPreguntas != null)
                        {
                        
                            for (int i=0;i<=sPreguntas.GetUpperBound(0);i++)
                             {%>
                            sCode = "<%=sPreguntas[i,0]%>";
                            sPregunta = "<%=sPreguntas[i,1]%>";
 

                            transaction.executeSql('INSERT INTO AX_PREGUNTAS VALUES  (?, ?)', [sCode, sPregunta],
                            nullDataHandler, killTransaction);

                            iImport++;

                        <% }
                        }%>

                        var sMsg = "Se han importado correctamente " + iImport.toString() + " preguntas." ; 
                        $('#msg2').text(sMsg);
                    }
             );

            }
            catch (e) {
                alert(e);
                errorfunction(e);
            }
        }


        function successfunction() {
         //   $.mobile.hidePageLoadingMsg();
        }

        function errorHandler(transaction, error) {
            Alert(error.message + ' (Code ' + error.code + ')');
            return true;
        }

        function nullDataHandler(transaction, results) {
        }

        function errorfunction(e) {
            if (e == DOMException.INVALID_STATE_ERR) {

                Alert("Invalid database version.");
            } else {
                Alert("Unknown error " + e + ".");
            }
            $.mobile.hidePageLoadingMsg();
        }

       $(document).delegate('#volver', 'click', function () {
           window.location.assign('HerramientasMenu.html');

        });

 
</script>
</head> 

<body>

          <div data-role="page" id="importaux" data-theme="c" >

	         <div data-role="header">
	            <a href="javascript:window.location.assign('HerramientasMenu.html');" data-icon="back">Anterior</a>
	            <h1>Importación</h1>
                <a href="javascript:window.location.assign('index.html');" data-icon="home">Inicio</a>
            </div>

	        <div data-role="content">	

                <ul data-role="listview" data-inset="true">
                    <li data-role="list-divider">Importación Ventas</li>
				    <li id ="msg"></li>
                    <li id ="msg2"></li>
                    <li class="ui-body ui-body-b">
				        <fieldset class="ui-grid-b">
                                <div data-theme="b" class="ui-block-a"></div> 
						        <div data-theme="d" class="ui-block-b"><button id="volver" data-theme="a">Volver</button></div>
                                <div data-theme="b" class="ui-block-c"></div> 
			            </fieldset>
			        </li>
  			    </ul>

 
     
            </div> 

              <div data-role="footer"  data-position="fixed" >
                    <div data-role="navbar" data-iconpos="top">
                        <ul>
                            <li><a href="javascript:window.location.assign('RuteroMenu.html');"  data-icon="back" >Rutero</a></li>
                            <li><a href="javascript:window.location.assign('VentasInicio.html');"  data-icon="plus" data-prefetch="true"  >Ventas/Visitas</a></li>
                            <li><a href="javascript:window.location.assign('ClientesGeneral.html');"  data-icon="back" >Interlocutores</a></li>
                            <li><a href="javascript:window.location.assign('Articulos.html');"  data-icon="back" >Articulos</a></li>
                        </ul>                
                </div>
            </div>

         </div>

</body>
</html>