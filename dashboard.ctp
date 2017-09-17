<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../../favicon.ico">
        <title>::Loanbright::</title>
        <!-- Core CSS -->
        <?php echo $this->Html->css(['bootstrap', 'ie10-viewport-bug-workaround', 'sumoselect.min.css', 'jquery.bxslider', '/font-awesome/css/font-awesome.min', 'roundslider.min', 'jquery.mCustomScrollbar', 'master', 'media']); ?>
        <!-- FONTS -->
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <?= $this->Flash->render(); ?>
        <?php echo $this->element('header'); ?>
        <section class="main-wrap">
            <?php echo $this->element('left-sidebar'); ?>
            <?= $this->fetch('content'); ?>
            <?php echo $this->element('footer'); ?>
        </section>
        <?php echo $this->Html->script(['jquery.min', 'bootstrap', 'jquery.bxslider', 'roundslider.min', 'custom', 'cakeScripts', 'jquery.sumoselect.min', 'jquery.mCustomScrollbar', 'ie10-viewport-bug-workaround']); ?>
        <script>
            jQuery(document).ready(function () {
                window.asd = jQuery('.SlectBox').SumoSelect();
            });
        </script>
    </body>
</html>