// random number between 2 values
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var Main = function() {

  var options = {

    stockHTML : '',
    balance : 1000,
    priceChange : 'neutral',
    autoInterval : null

  },

  selectors = {

    stockList : $('.stocks'),
    balance : $('.balance .amount'),
    myStocks : $('.myStocks'),
    updateBtn : $('.updateBtn'),
    autoUpdate : $('.autoUpdate'),
    autoUpdateLabel : $('.autoUpdate__label')

  },

  data = {

    stocks: [
        {
            id: 0,
            name: 'Coffee',
            oldPrice: 20,
            price: 20,
            priceRange: [10,15,20,25,30]
        },
        {
            id: 1,
            name: 'Cotton',
            oldPrice: 10,
            price: 10,
            priceRange: [5,10,15,20]
        },
        {
            id: 2,
            name: 'Spices',
            oldPrice: 5,
            price: 5,
            priceRange: [5,10,15]
        },
        {
            id: 3,
            name: 'Iron',
            oldPrice: 40,
            price: 40,
            priceRange: [50,55,60,65]
        }
    ]

  },

  _private = {

    init : function() {

      _private.generateStockList();

      selectors.updateBtn.on('click', function() {

        _private.priceUpdate();

      });

      selectors.autoUpdate.on('change', function() {

        _private.autoUpdate(this);

      });

    },

    autoUpdate: function(obj) {

        if($(obj).is(":checked")){

            _private.priceUpdate();

            selectors.autoUpdateLabel.addClass('active');
            
            options.autoInterval = setInterval(function() {

                _private.priceUpdate();

            }, 2000);

        } else {
            
            selectors.autoUpdateLabel.removeClass('active');

            clearInterval(options.autoInterval);

        }
  
    },

    generateStockList: function() {

        $.each(data.stocks, function(index, stock) {

            options.stockHTML +=     '<li data-id="' + stock.id + '" class="stock">' +
                                        '<div class="stock__title">Stock</div>' +
                                        '<div class="stock__value">' + stock.name + '</div>' +
                                        '<div class="stock__title">Price</div>' +
                                        '<div class="stock__value stock__value--price">' +
                                            '<div class="stock__price">' + stock.price + '</div>' +
                                            '<img class="stock__price__img" src="assets/img/coin.svg" />' +
                                        '</div>' +
                                    '</li>';

        });

        selectors.stockList.append(options.stockHTML);

    },

    priceUpdate: function() {

        var priceChange = randomNum(-3, 3) * 5;

        $.each(data.stocks, function(index, stock) {

            stock.oldPrice = stock.price;
            stock.price = stock.priceRange[randomNum(0,stock.priceRange.length - 1)];

            if(stock.price > stock.oldPrice) {
                console.log("higher");
                options.priceChange = 'higher';
            } else if(stock.price < stock.oldPrice) {
                console.log("lower");
                options.priceChange = 'lower';
            } else {
                console.log("same");
                options.priceChange = 'neutral';
            }

            selectors.stockList.find('.stock[data-id="' + index + '"]').find('.stock__price').html(stock.price).parent().removeClass('neutral higher lower').addClass(options.priceChange);

        });

    }

  };

  return {
    
    init: _private.init

  }

}

Main().init();