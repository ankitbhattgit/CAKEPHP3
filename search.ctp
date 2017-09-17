<?php
$product_options = ['LenderOwners' => 'Owner Occupied', 'LenderInvestments' => 'Investment', 'both' => 'Both'];
$interest_options = ['fixed' => 'Fixed', 'variable' => 'Variable', 'both' => 'Both'];
$features_options = ['Interest Only', 'Professional Package', '100% offset', 'Redraw', 'Extra Payment', 'No Frill'];

$amount = !empty($amount) ? $amount : '';
$selectedtLender = !empty($lenderType) ? $lenderType : '';
$selectedInterest = !empty($interest) ? $interest : '';
$selectedFeature = !empty($features) ? $features : '';
$totalLenders = !empty($totalLenders) ? $totalLenders : 0;
?>
<div class="content-main">
    <div class="search-top">
        <div class="container pos-rltv">
            <div class="row">
                <div class="col-sm-12 ipad-68 side-fill">
                    <h4 class="search-ttl">Search results</h4>
                    <div class="search-bx">
                        <h4 class="srch-ttl">What you told us yours needs are?</h4>
                        <div class="srch-flt-qs">
                            <?= $this->Form->create(); ?>
                            <div class="srch-lblrw">
                                <div class="qs-lbl">
                                    <!-- REPEAT -->
                                    <div class="qs-blk-wrp">
                                        <label>Loan Amount: </label>
                                        <div class="select-wrap crnci-lbl">
                                            <span class="dolor-labal">$</span>
                                            <input type="text" name= "amount" value="<?= $amount; ?>" class="form-control">
                                        </div>
                                    </div>
                                    <!-- /REPEAT -->
                                    <!-- REPEAT -->
                                    <div class="qs-blk-wrp">
                                        <label>Property Purpose: </label>
                                        <div class="select-wrap">
                                            <?= $this->Form->input('lender', array('type' => 'select', 'class' => 'form-control SlectBox home-search', 'options' => $product_options, 'label' => false, 'dafault' => $selectedtLender, 'onchange' => "this.form.submit()")); ?>
                                        </div>
                                    </div>
                                    <!-- /REPEAT -->
                                </div>
                                <div class="qs-lbl">
                                    <!-- REPEAT -->
                                    <div class="qs-blk-wrp">
                                        <label>Your prefer interest type: </label>
                                        <div class="select-wrap">
                                            <?= $this->Form->input('interest_type', array('type' => 'select', 'class' => 'form-control SlectBox home-search', 'options' => $interest_options, 'label' => false, 'default' => $selectedInterest , 'onchange' => "this.form.submit()")); ?>
                                        </div>
                                    </div>
                                    <!-- /REPEAT -->
                                </div>
                                <div class="qs-lbl qs-lbl-lst">
                                    <label>The features you like:  </label>
                                    <div class="select-wrap">
                                        <ul>
                                            <?php
                                          //  pr($features_options);
                                            foreach ($features_options as $featurekey => $features) :
                                                $checked = '';
                                                if (!empty($selectedFeature)) :
                                                foreach ($selectedFeature as $selectkey => $selected) :
                                                     if ($selected == $features) :
                                                            $checked = 'checked';
                                                        endif;
                                                endforeach;
                                                endif;
                                                ?>
                                            <li>
                                                <div class="checkbox-wrp unck-bx">
                                                    <input class="check-input" type="checkbox" name="feature[]" value="<?= $features; ?>" <?= $checked; ?>>
                                                    <label class="checkbox-label"><?= $features; ?></label>
                                                </div>
                                            </li>

                                            <?php endforeach; ?>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <?= $this->Form->end(); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-white bd-ln-rw">
        <div class="container">
            <div class="row rw-flx">
                <div class="col-sm-12 side-fill">
                    <!-- SEARCH RESULT -->
                    <?php if($totalLenders > 0 && !empty($lenders)) :  ?>
                    <section class="srch-wrp">
                        <h3 class="ln-rsl-hd">We found these <?php echo $totalLenders; ?> loan that matched your requirements</h3>
                        <!-- SEARCH TABLE -->

                        <div class="table-responsive overflow-visible">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th width="9%">Lender</th>
                                        <th width="10%">Interest Rate</th>
                                        <th width="13%">Comparison Rate</th>
                                        <th width="13%">Monthly Payment</th>
                                        <th width="11%">Effective Cost</th>
                                        <th width="10%">Max LVR</th>
                                        <th width="10%">Key Features</th>
                                        <th width="10%"></th>
                                    </tr>
                                </thead>
                                <tbody class="valign">
                                    <?php foreach($lenders as $key => $lender) : 
                                        $convertedArray = current((array)$lender);
                                        foreach ($convertedArray as $key => $value) :
                                            if(is_object($value)) :
                                                $objectValue = $key;
                                                break;
                                            endif;      
                                        endforeach;
                                         $value = current((array)$lender);
                                         
                                          if (!empty($popular_owner->wishlist_id)) {
                            $like_class = 'fa-heart';
                            $like_status = 'unlike';
                        } else {
                            $like_class = 'fa-heart-o';
                            $like_status = 'like';
                        }
                                    ?>
                                    <tr>
                                        <td>
                                            <div class="display-table pd-nm-td">
                                                <div class="display-cell width120">
                                                    <img src="<?= $lender->logo; ?>" />
                                                </div>
                                                <div class="display-cell">
                                                    <h4><?= $lender->code . ' '; ?></h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="td-incrs-fnt"><?= $lender->$objectValue->interest; ?></p>
                                        </td>
                                        <td>
                                            <p><?= $lender->$objectValue->comparison_rate; ?></p>
                                        </td>
                                        <td>
                                            <p><?= $lender->$objectValue->monthly_cost; ?></p>
                                        </td>
                                        <td>
                                            <p>$25,000</p>
                                        </td>
                                        <td>
                                            <p><?= $lender->$objectValue->max_lvr; ?></p>
                                        </td>
                                        <td>
                                            <p> - </p>
                                        </td>
                                        <td>
                                            <div class="action-table">
                                                <div>
                                                    <a class="shortlistLoan" data-lenderid = "<?php echo $lender->id; ?>" data-eventtype = "<?php echo $like_status; ?>" >
                                                        <i class="fa <?php echo $like_class; ?>"></i>Like
                                                    </a>   

                                                </div>
                                                <div>
                                                    <a class="mrinf-lnk" href="javascript:void(0);">more info</a>                   							 												</div>
                                            </div>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>

                        <div class="nd-chat">
                            <div class="display-table">
                                <div class="display-cell text-center">
                                    <p>Need help deciding which one is right for you ? We're here to help with all your home loan questions</p>
                                </div>
                                <div class="display-cell text-center">
                                    <a href="javascript:void(0);" class="btn btn-default flat-btn lncstm-btn ">Live Chat Now</a>
                                </div>
                            </div>
                        </div>
                        <div class="load-more-wrp wow animated fadeInUp">
                            <a class="btn flat-btn load-more btn-ft lncstm-btn" href="javascript:void(0);">Show more</a>
                            <a class="btn btn-green" href="javascript:void(0);"><span>Compare Liked Loan</span></a>
                        </div>
                        <!-- /SEARCH TABLE -->
                    </section>
                    <?php else :?>
                    <section class="srch-wrp">
                        <h3 class="ln-rsl-hd">Sorry we didn't find any results matching your requirements.</h3>
                    </section>
                    <?php endif; ?>
                    <!-- /SEARCH RESULT -->
                </div>
                <div class="col-sm-3 sd-srch-rt ipad-32 showintab">

                </div>
            </div>
        </div>
    </div>
</div>

<?php echo $this->element('right-sidebar'); ?>

<section class="cntct-wrp">
    <div class="container">
        <div class="row display-table">
            <div class="col-sm-9 ipad-68 display-cell">
                <h3>Co-broker your home loan and share the brokerage income</h3>
                <p>We make our pre-analyzed home loans available to you to search and compare. Using our comparison tool, you can instantly decide which loan is right for you and save.</p>
            </div>
            <div class="col-sm-9 display-cell ipad-32 more-btm">
                <a class="btn btn-block btn-lg transparent-btn" href="javascript:void(0);">
                    <span>More info <i class="fa fa-angle-right big-angle-rt"></i></span>
                </a>
            </div>
        </div>
    </div>
</section>
