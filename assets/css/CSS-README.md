# Important Info

- These css files must not be modified explicitly in any case

- If you wish to add/modify css. Make changes to the SASS and compile it with the live-SASS-Compiler (by Ritwickey) in VS Code.
    -make sure to make changes in you settings.json as follows:
        i. Type Ctrl+Shift+P and then type "Open settings (JSON)". press Enter.
        ii. Edit the settings.json by adding the code below

        ```
        //Copy the code below
        
        "liveSassCompile.settings.formats":[
            {
                "format": "compressed",
                "extensionName": ".min.css",
                "savePath": "/assets/css"
            },
            {
                "format": "expanded",
                "extensionName": ".css",
                "savePath": "/assets/css"
            },
        ]
        ```
