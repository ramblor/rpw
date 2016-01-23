(function () {
    var app = angular.module("rpw", ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/home', {
                        templateUrl: 'html/home.html'
                    })
                    .when('/about', {
                        templateUrl: 'html/about.html'
                    })
                    .when('/lowmoor', {
                        templateUrl: 'html/lowmoor-jt.html'
                    })
                    .when('/jewelandthorn', {
                        templateUrl: 'html/lowmoor-jt.html'
                    })
                    .when('/brasskey', {
                        templateUrl: 'html/lowmoor-bk.html'
                    })
                    .when('/ironangel', {
                        templateUrl: 'html/lowmoor-ia.html'
                    })
                    .when('/youngreaders', {
                        templateUrl: 'html/youngreaders.html'
                    })
                    .when('/news', {
                        templateUrl: 'html/news.html'
                    })
                    .when('/credits', {
                        templateUrl: 'html/credits.html'
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
                        {link: 'about', label: 'About'},
                        {link: 'lowmoor', label: 'The Book of Lowmoor'},
                        {link: 'youngreaders', label: 'For Young Readers', toggle: true},
                        //{link: 'poetry', label: 'Poetry', toggle: true},
                        //{link: 'criticism', label: 'Criticism', toggle: true},
                        {link: 'news', label: 'Stop Press - Latest News', toggle: true}
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
                    }
                },
                controllerAs: 'tabs'
            };
        });
})();
