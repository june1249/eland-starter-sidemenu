serviceModule.factory('MenuService', function() {
  var all = function() {
    return [
      {
        data: {
          menuVersion: "3",
          accountInfo: {
              email: "JANG_JOONHYUK01@eland.co.kr",
              name: "장준혁",
              id: 110447,
              isManager: false
          },
          sections: [
            {
              index: 1,
              name: "테스트 메뉴",
              menus: [
                  {
                      index: 1,
                      name: "Search",
                      url: "#/app/search",
                      viewType: 0,
                      icon: "menu_01"
                  },
                  {
                      index: 2,
                      name: "Browse",
                      url: "#/app/browse",
                      viewType: 0,
                      icon: "menu_01"
                  },
                  {
                      index: 2,
                      name: "Playlists",
                      viewType: 0,
                      icon: "menu_01",
                      menus: [
                        {
                            index: 1,
                            name: "Playlists",
                            url: "#/app/playlists",
                            viewType: 0,
                            icon: "menu_01"
                        }
                      ]
                  }
              ]
            }
          ]
        }
      }
    ]
  }

  // Should be a DB query in real life
  var get = function(id) {
    var categories = all();

    for (var i = 0; i < categories.length; i++) {
      var level1 = categories[i];
      if (level1.id == id) {
        return level1;
      }

      for (var j = 0; j < level1.items.length; j++) {
        var level2 = level1.items[j];

        if (level2.id == id) {
          return level2;
        }

        for (var k = 0; k < level2.items.length; k++) {
          var level3 = level2.items[k];

          if (level3.id == id) {
            return level3;
          }
        }
      }
    }

    return null;
  }

  // Public API
  return {
    all: all,
    get: get
  }
});
