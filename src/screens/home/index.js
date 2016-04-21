import styles from './index.scss';
import template from './index.html';

function HomeController($scope, $timeout){
  const home = this;

  home.$postLink = () => {
    console.log('home init');
  }

  home.items = ['Item 1', 'Item 2', 'Item 3'];

  home.doRefresh = function() {

    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      home.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');

    }, 1000);

  };
}

export default angular
  .module('ng-starter.home', [])
  .component('home', {
    template: template,
    controller: HomeController
  })
  .name;
