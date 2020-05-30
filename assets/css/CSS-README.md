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

Learn SASS on YouTube. Follow the links below:

- #6 Imp: <https://www.youtube.com/watch?v=NWupx6SzHd0>
- #7 Imp: <https://www.youtube.com/watch?v=c3fwnwSRGU0>
- #8 Not so important unless You decide to create new .scss files: <https://www.youtube.com/watch?v=GI1BhlDtoUs>
- #9 important but optional: Learn mixins: <https://www.youtube.com/watch?v=Sml4jVk445c>

- Very helpful site to give you the knowledge about SASS best practices: <http://smacss.com/book/categorizing>
  - **Base rules** are the defaults. They are almost exclusively single element selectors but it could include attribute selectors, pseudo-class selectors, child selectors or sibling selectors. Essentially, a base style says that wherever this element is on the page, it should look like this.
  - **Layout rules** divide the page into sections. Layouts hold one or more modules together.
  - **Modules** are the reusable, modular parts of our design. They are the call-outs, the sidebar sections, the product lists and so on.
