import { useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';



const LoadEditorDark = ({html,setHtml, toolbar = `preview fullscreen | pastetext | undo redo | 
casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | 
bullist numlist checklist outdent indent | removeformat visualchars charmap | image link table | code
`}) => {
    const editorRef             = useRef(null);
    const [editor,setEditor]    = useState(<></>);
    const [loading,setLoading]  = useState(true);

    const handleEditorInit = (editor) => {
        // console.log('TinyMCE initialized:', editor);
        // Perform actions after initialization
        setLoading(false);
    };


    useEffect(() => {
        
        const TMCE = {};
        TMCE.apiKey = '5g4xxchrai4wtgywcyir7v6ofscpaidl5u7heiclghfaral6';
        TMCE.config = {
            height: 300,
            menubar: false,
            plugins: [
                'paste',
                'advlist','autolink',
                'lists','link','image','charmap','preview','searchreplace','visualblocks',
                'fullscreen','insertdatetime','table','wordcount','quickbars','visualchars','charmap','code'
            ],
            toolbar: toolbar,
            init_instance_callback: handleEditorInit,
            quickbars_selection_toolbar: 'bold italic | charmap | quicklink blockquote',
            contextmenu: 'bold italic link charmap'
        };

        TMCE.config.skin = "oxide-dark";
        TMCE.config.content_css = "dark";

        setEditor(<Editor
            apiKey={TMCE.apiKey}
            onInit={(evt, editor) => { editorRef.current = editor; } }
            initialValue={html}
            placeholder="Passage content"
            init={TMCE.config}
            onEditorChange={(content) => { setHtml(content); }}
        />);

            
    },[]);
    return (<>
        {loading && <Skeleton variant="rectangular" width="100%"><div style={{ height: "300px" }} /></Skeleton>}
        <div className={loading? "d-none" : ""}>{editor}</div>
    </>);
};

const LoadEditorLight = ({html,setHtml, toolbar = `preview fullscreen | pastetext | undo redo | 
casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | 
bullist numlist checklist outdent indent | removeformat visualchars charmap | image link table | code
`, contentCss = '', height = 300}) => {
    const editorRef             = useRef(null);
    const [editor,setEditor]    = useState(<></>);
    const [loading,setLoading]  = useState(true);

    const handleEditorInit = (editor) => {
        // console.log('TinyMCE initialized:', editor);
        // Perform actions after initialization
        setLoading(false);
    };

    useEffect(() => {
        
        
        const TMCE = {};
        TMCE.apiKey = '5g4xxchrai4wtgywcyir7v6ofscpaidl5u7heiclghfaral6';
        TMCE.config = {
            height: height || 300,
            menubar: false,
            plugins: [
                'advlist','autolink',
                'lists','link','image','charmap','preview','searchreplace','visualblocks',
                'fullscreen','insertdatetime','table','wordcount','quickbars','visualchars','charmap','code'
                
            ],
            toolbar: toolbar,
            init_instance_callback: handleEditorInit,
            quickbars_selection_toolbar: 'h1 h2 h3 | alignLeft alignCenter alignRight | bold italic table',
            contextmenu: 'bold italic fontsize forecolor backcolor table',
            content_css: contentCss,
            setup: function (editor) {
                editor.on('paste', function (e) {
                    // Handle the paste event within TinyMCE
                    const pastedContent = e.clipboardData.getData('text/plain');
                    // Handle the pasted content as needed
                    
                    // Remove the "bg-active" class from your buttons here if needed
                    const buttons = document.querySelectorAll('.question__options-pills-animate');
                    buttons.forEach((button) => {
                        button.classList.remove('bg-active');
                    });

                });
            }
        };

        setEditor(<Editor
            scriptLoading={{ async: true }}
            apiKey={TMCE.apiKey}
            onInit={(evt, editor) => { editorRef.current = editor; }}
            initialValue={html}
            placeholder=""
            init={TMCE.config}
            onEditorChange={(content) => { setHtml(content); }}
            
        />);


            
    },[]);
    return (<>
        {loading && <Skeleton variant="rectangular" width="100%"><div style={{ height: `${height}px` }} /></Skeleton>}
        <div className={loading? "d-none" : ""}>{editor}</div>
    </>);
};


const LoadEditor = ({html,setHtml,toolbar = `preview fullscreen | pastetext | undo redo | 
casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | 
bullist numlist checklist outdent indent | removeformat visualchars charmap | image link table | code
`, contentCss = '', height = 300}) => {
    const [e,setE]      = useState(<></>);
    const { THEME }     = useSelector( state => state.theme );
    useEffect(() => {
        if(THEME === "light"){            
            setE(<LoadEditorLight html={html} setHtml={setHtml} toolbar={toolbar} contentCss={contentCss} />);
            
            
        } else if(THEME === "dark"){           
            setE(<LoadEditorDark html={html} setHtml={setHtml} toolbar={toolbar} contentCss={contentCss} />);
            
        }
    },[THEME]);
    return (<>{e}</>);
};


export { LoadEditorDark, LoadEditorLight, LoadEditor };