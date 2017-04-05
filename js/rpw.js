(function () {
    var app = angular.module("rpw", ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/home', {
                        templateUrl: 'html/home.html',
                        title: 'Home'
                    })
                    .when('/about', {
                        templateUrl: 'html/about.html',
                        title: 'About'
                    })
                    .when('/lowmoor', {
                        templateUrl: 'html/lowmoor/jewel-and-thorn.html',
                        title: 'Jewel and Thorn'
                    })
                    .when('/lowmoor/jewelandthorn', {
                        templateUrl: 'html/lowmoor/jewel-and-thorn.html',
                        title: 'Jewel and Thorn'
                    })
                    .when('/lowmoor/brasskey', {
                        templateUrl: 'html/lowmoor/brass-key.html',
                        title: 'The Brass Key'
                    })
                    .when('/lowmoor/ironangel', {
                        templateUrl: 'html/lowmoor/iron-angel.html',
                        title: 'The Iron Angel'
                    })
                    .when('/poetry', {
                        templateUrl: 'html/poetry/poetry.html',
                        title: 'Poetry'
                    })
                    .when('/poetry/goings', {
                        templateUrl: 'html/poetry/goings.html',
                        title: 'Goings and Other Poems'
                    })
                    .when('/poetry/words', {
                        templateUrl: 'html/poetry/words.html',
                        title: 'Words Before Midnight'
                    })
                    .when('/poetry/naturalhistories', {
                        templateUrl: 'html/poetry/natural-histories.html',
                        title: 'Natural Histories'
                    })
                    .when('/poetry/autobiographies', {
                        templateUrl: 'html/poetry/autobiographies.html',
                        title: 'Autobiographies and Explorations'
                    })
                    .when('/poetry/thatfooljuly', {
                        templateUrl: 'html/poetry/that-fool-july.html',
                        title: 'That Fool July'
                    })
                    .when('/poetry/camelion', {
                        templateUrl: 'html/poetry/camelion.html',
                        title: 'Camelion'
                    })
                    .when('/essays/richard-hughes/', {
                        templateUrl: 'html/essays/richard-hughes/richard-hughes.html',
                        title: 'Richard Hughes'
                    })
                    .when('/essays/richard-hughes/novelist', {
                        templateUrl: 'html/essays/richard-hughes/novelist.html',
                        title: 'Richard Hughes, Novelist'
                    })
                    .when('/essays/richard-hughes/fiction-as-truth', {
                        templateUrl: 'html/essays/richard-hughes/fiction-as-truth.html',
                        title: 'Fiction as Truth'
                    })
                    .when('/essays/richard-hughes/a-manifold-world', {
                        templateUrl: 'html/essays/richard-hughes/a-manifold-world.html',
                        title: 'A Manifold World'
                    })
                    .when('/essays/richard-hughes/under-the-nose', {
                        templateUrl: 'html/essays/richard-hughes/under-the-nose.html',
                        title: 'Under the Nose and Under the Skin'
                    })
                    .when('/essays/richard-hughes/a-high-wind', {
                        templateUrl: 'html/essays/richard-hughes/a-high-wind.html',
                        title: 'Irony in A High Wind in Jamaica'
                    })
                    .when('/essays/richard-hughes/in-hazard', {
                        templateUrl: 'html/essays/richard-hughes/in-hazard.html',
                        title: 'In Hazard'
                    })
                    .when('/essays/richard-hughes/morality-and-selfhood', {
                        templateUrl: 'html/essays/richard-hughes/morality-and-selfhood.html',
                        title: 'Morality and Selfhood'
                    })
                    .when('/essays/richard-hughes/the-human-predicament', {
                        templateUrl: 'html/essays/richard-hughes/the-human-predicament.html',
                        title: 'The Human Predicament'
                    })
                    .when('/news', {
                        templateUrl: 'html/news.html',
                        title: 'News'
                    })
                    .when('/credits', {
                        templateUrl: 'html/credits.html',
                        title: 'Credits'
                    })
                    .otherwise({redirectTo: '/home'});
                $locationProvider.html5Mode(true);
            }])
        .controller('MainCtrl', ['$route', '$routeParams', '$location', '$rootScope',
            function ($route, $routeParams, $location, $rootScope) {
                var path = function() { return $location.path();};
                $rootScope.$watch(path, function(newVal, oldVal){
                    $rootScope.activeTab = newVal.substring(1);
                });
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }])
        .directive('rpwTabs', function () {
            return {
                restrict: 'E',
                templateUrl: 'html/tabs.html',
                controller: function ($scope, $rootScope) {
                    $scope.more = false;
                    $scope.tabs = [
                        {link: 'home', label: 'Home'},
                        {link: 'about', label: 'About Myself'},
                        {link: 'lowmoor', label: 'The Book of Lowmoor'},
                        {link: 'poetry', label: 'Poetry', toggle: true},
                        {link: 'essays/richard-hughes', label: 'Richard Hughes', toggle: true},
                        {link: 'news', label: 'Stop Press', toggle: true}
                    ];
                    $scope.tabClass = function(tab) {
                        var c = "nav__tabs--" + tab.link;
                        if ($rootScope.activeTab === tab.link) {
                            c += " nav__tabs--active";
                        }
                        if (tab.toggle) {
                            c += " toggle";
                        }
                        return c;
                    }
                    $scope.showMore = function() {
                        $scope.more = !$scope.more;
                        $(".nav__tabs li.toggle").toggle($scope.more);
                        if ($scope.more){
                            $(".nav__tabs li.toggle").css('display','inline-block');
                        }
                        $scope.toggleText = $scope.more ? 'Less' : 'More';
                    }
                },
                controllerAs: 'tabs'
            };
        });

    app.run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current.hasOwnProperty('$$route')) {
                $rootScope.title = current.$$route.title;
            }
        });
    }]);
})();
