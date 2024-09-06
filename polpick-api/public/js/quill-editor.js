('use strict');

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
];

$(document).ready(function(){
    let editors = $('.editor');
    if ($(editors).length) {
        for (let i=0;i<$(editors).length;i++) {
            const textArea = $($(editors)[i]).data('targetid');
            const quill = new Quill($(editors)[i], {
                modules: {
                    syntax: true,
                    toolbar: toolbarOptions
                },
                placeholder: 'Write Something Here...',
                theme: 'snow'
            });
            
            Quill.prototype.getHTML = function () {
                return this.container.querySelector('.ql-editor').innerHTML;
            };
            
            Quill.prototype.setHTML = function (html) {
                this.container.querySelector('.ql-editor').innerHTML = html;
            };

            quill.on('text-change', () => {
                $('#' + textArea).val(quill.getHTML());
            });

            $('#' + textArea).on('ready', function(){
                let value = $('#' + textArea).val();
                quill.setHTML(value);
            });

            $('#' + textArea).on('change', function(){
                let value = $('#' + textArea).val();
                quill.setHTML(value);
            });
        }
    }
});
