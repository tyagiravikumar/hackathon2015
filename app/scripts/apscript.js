function showhideleftnav()
{

//alert(window.outerWidth);
//alert(this.width);
	if(document.getElementById('showBar').style.display == 'none')
	{
		ShowNav();
	}
	else
	{
		HideNav();
	}
	return false;
}

function ShowNav()
{		
document.getElementById('showBar').style.width='250px';
document.getElementById('showBar').style.display='block';

		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '#page-wrapper{ margin:0 0 0 250px !important; padding:0 0 0 30px !important; background-color:#ffffff !important;} ';
		document.getElementsByTagName('head')[0].appendChild(style);
}

function HideNav()
{	
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '#page-wrapper{ margin:0px !important; padding:0px !important; background-color:#f8f8f8 !important;} ';
		document.getElementsByTagName('head')[0].appendChild(style);
		
		document.getElementById('showBar').style.display='none';
}