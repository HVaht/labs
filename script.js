  window.addEventListener('load', function() {
      new PlainDraggable('.card', { handle: '.handle' });
    });


    $(function() {
      var $grid = $('.grid');
      for (var i = 0; i < 100; i++) {
        var $row = $('<div>').addClass('row');
        for (var j = 0; j < 80; j++) {
          var $col = $('<div>').addClass('col');
          $row.append($col);
        }
        $grid.append($row);
      }
    });
