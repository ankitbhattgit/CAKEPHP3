<?php
namespace App\Controller;

use Cake\ORM\TableRegistry;
use Cake\Event\Event;

class LendersController extends AppController {

    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
    }

    /**
      @function : result
      @description : display search results
      @params:
      @Created by : Ankit
      @Created Date : 11-08-2017
     */
    public function search() {

        $this->viewBuilder()->layout('dashboard');
        if (!empty($this->request->data)) {
            $lenderTable = TableRegistry::get('Lenders');
            //  pr($this->request->data);


            $lenderType = $this->request->data['lender'];
            $amount = $this->request->data['amount'];
            $interest = $this->request->data['interest_type'];
            $features = $this->request->data['feature'];

            if(($interest == 'fixed') || ($interest == 'variable')) {
                $condition = ['Lenders.interest_type' => $interest]; 
            } else if ($interest == 'both')  {
                $condition = '';
            }

            if (($lenderType == 'LenderOwners') || ($lenderType == 'LenderInvestments')) {
                $lenders = $lenderTable->find()
                        ->contain($lenderType)
                        ->matching($lenderType)
                        ->where($condition)
                    //    ->limit(8)
                        ->all();
                
            } else if ($lenderType == 'both') {
                $lenders = $lenderTable->find()
                        ->contain(['LenderOwners', 'LenderInvestments'])
                        ->where($condition)
                    //    ->limit(8)
                        ->all();
                
            }
            $count = $lenders->count();
            $totalLenders = ($count) ? $count : 0;

            //  pr($lenders);
            // die;
            $this->set(compact('lenders', 'totalLenders', 'lenderType', 'amount', 'interest', 'features'));
        }
    }

    /**
      @function : addTolist
      @description : add to lender product to wishlist
      @params: null
      @Created by : Ankit
      @Created Date : 11-08-2017
     */
    public function addTolist() {

        $this->autoRender = false;

        $wishlistTable = TableRegistry::get('Wishlists');
        $wishlist = $wishlistTable->newEntity();

        if ($this->request->is('ajax') && !empty($this->request->data['lenderId'])) {
            $wishlist->user_id = $this->request->session()->read('Auth.User.id');
            $wishlist->lender_id = $this->request->data['lenderId'];
            $eventType = $this->request->data['eventType'];

            if ($eventType == 'like') {
                if ($wishlistTable->save($wishlist)) {
                    echo 1;
                } else {
                    echo 0;
                }
                die;
            } else if ($eventType == 'unlike') {
                $result = $wishlistTable->find()
                        ->where(['user_id' => $wishlist->user_id, 'lender_id' => $wishlist->lender_id])
                        ->first();
                if (!empty($result)) {
                    if ($wishlistTable->delete($result)) {
                        echo 0;
                    } else {
                        echo 1;
                    }
                    die;
                }
            }
        }
    }
}
