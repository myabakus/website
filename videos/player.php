<?php require __DIR__ . '/bootstrap.php'; ?>
<!doctype html>
<html lang="<?= $video['lang']; ?>">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="<?= $video['desc']; ?>">
        <title>
            <?= $video['title']; ?>
        </title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cabin:600|Quattrocento+Sans:400">
        <!-- Bootstrap core CSS -->
        <link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
        <link href="../css/player.css" rel="stylesheet" type="text/css">
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1042441796"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-2211383-1"></script>
        <script type="text/javascript" src="../js/drift.js"></script>
        <script type="text/javascript" src="../js/fullstory.js"></script>
        <script type="text/javascript" src="js/fb.js"></script>
        <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2643049546010302&ev=PageView&noscript=1"/></noscript>
    </head>
    <body>
        <!-- Bootstrap core JavaScript
    ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <div class="container" style="max-width: 920px;">
            <div class="row">
                <div class="col-md-9 col-sm-9">
                    <h1><?= $video['title']; ?></h1>
                </div>
                <?php if ($next = $video->next()) : ?>
                    <div class="col-md-3 text-right col-sm-3">
                        <h3><a href="<?= $next->slug; ?>"><?= $next->translate(); ?></a></h3>
                    </div>
                <?php endif; ?>
            </div>
            <div class="row">
                <div>
                    <div class="embed-responsive embed-responsive-<?= $video['host'] === 'y' ? '16by9' : '4by3' ?>">
                        <iframe class="embed-responsive-item" src="<?= $video['url']; ?>" allowfullscreen=""></iframe>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <h2><?= $video['desc']; ?></h2>
                </div>
            </div>
        </div>
        <script src="../js/jquery.min.js"></script>
        <script src="../bootstrap/js/bootstrap.min.js"></script>
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script src="../js/ie10-viewport-bug-workaround.js"></script>
    </body>
</html>
