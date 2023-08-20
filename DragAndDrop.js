function draw(direction) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    var img = document.getElementById("pic")
    var pat = ctx.createPattern(img, direction);
    ctx.rect(0, 0, 1280, 1280);
    ctx.fillStyle = pat;
    ctx.fill();
}

$(document).ready(function () {
    var dropArea = $('#dropArea');

    // Highlight drop area when item is dragged over it
    dropArea.on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('dragover');
    });

    dropArea.on('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('dragover');
    });

    dropArea.on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('dragover');

        var file = e.originalEvent.dataTransfer.files[0];
        if (file && file.type.match('image.*')) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                $('#pic').attr('src', e.target.result).on('load', function () {
                    dropArea.children('p').hide();
                    draw('repeat');
                }).show();
            };
        }
    });
});

