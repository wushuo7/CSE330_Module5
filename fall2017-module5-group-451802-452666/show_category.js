        var show = true;
        function show_category(){
            show = true;
            alert("show the category");
            updateCalendar();
            show_event();
        }
        function hide_category(){
            show = false;
            alert("hide the category");
            updateCalendar();
            show_event();
        }
        
        
        document.getElementById("show_category").addEventListener("click", show_category, false);
        document.getElementById("hide_category").addEventListener("click", hide_category, false);