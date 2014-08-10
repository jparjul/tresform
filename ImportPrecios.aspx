<%@ page language="C#" autoeventwireup="true" inherits="ImportPrecios, App_Web_w0yudyfo" %>

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

        var Cliente = null;
        var NombreCliente = "";
        var myDB;
        var iImport =0;



        $("#importprices").live("pageinit", function (event) {

            var i;
            var sItemCode,sItemName,sEanCode,sSalUnitMsr,sNumInSale,sItemType,sIVA,sRecEquivalencia,sPesoBruto,sPesoNeto,sPesoEscurrido

            $.mobile.loadingMessageTextVisible = true;
            $.mobile.showPageLoadingMsg("a", "Procesando Precios...", false);

            try {

                myDB = OpenDatabase(successfunction, errorfunction);

                myDB.transaction(
                    function (transaction) {

                    transaction.executeSql('DELETE  FROM AX_PRECIOS', [], nullDataHandler, killTransaction);

                       <% for (int i=0;i<=sItems.GetUpperBound(0);i++)
                          //for (int i=0;i<11427;i++)
                        {%>
                            sPrecio=0;
                            <% if (sItems[i,1] != null) { %>
                                sCardCode = "<%=sItems[i,1]%>";
                                sItemCode = "<%=sItems[i,0]%>";

                                <%if (sItems[i,2] != String.Empty) %>
                                     sPrecio = <%=sItems[i,2]%>;
  
                              transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', [sCardCode, sItemCode,sPrecio],
                                nullDataHandler, errorfunction);

                                iImport++;
                             <% }%>


                        <% 
                        }%>

                        var sMsg = "Se han importado correctamente " + iImport.toString() + " Precios." ; 
                        $('#msg').text(sMsg);
                    }
             );

           }
            catch (e) {
                Alert("Invalid database version.");
                errorfunction(e);
            }

            $.mobile.hidePageLoadingMsg();
           // window.location.assign('HerramientasImportar.html');

        });




        function successfunction() {
          //  $.mobile.hidePageLoadingMsg();
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
          //  $.mobile.hidePageLoadingMsg();
        }

               $(document).delegate('#volver', 'click', function () {
           window.location.assign('HerramientasMenu.html');

        });
 
</script>
</head> 

<body>

           <div data-role="page" id="importprices" data-theme="c" >

	         <div data-role="header">
	            <a href="javascript:window.location.assign('HerramientasMenu.html');" data-icon="back">Anterior</a>
	            <h1>Importación</h1>
                <a href="javascript:window.location.assign('index.html');" data-icon="home">Inicio</a>
            </div>

	        <div data-role="content">	

                <ul data-role="listview" data-inset="true">
                    <li data-role="list-divider">Importación Precios</li>
				    <li id ="msg">Importando fichero de Precios. Espere....</li>
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