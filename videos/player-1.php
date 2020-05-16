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
        <script type="text/javascript" src="../js/km.js"></script>
        <script type="text/javascript" src="../js/drift.js"></script>
        <script type="text/javascript" src="../js/fullstory.js"></script>
        <!--[if lt IE 9]>
        <script src="../js/html5shiv.js"></script>
        <script src="../js/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <!-- Bootstrap core JavaScript
    ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <div class="container" style="max-width: 900px; min-width: 300px;">
            <div class="row">
                <div class="col-lg-9 col-md-9">
                    <h1><?= $video['title']; ?></h1>
                </div>
                <?php if ($next = $video->next()) : ?>
                    <div class="col-lg-3 col-md-3 text-right">
                        <h3><a href="<?= $next->slug; ?>"><?= $next->translate(); ?></a></h3>
                    </div>
                <?php endif; ?>
            </div>
            <div class="row">
                <div>
                    <div class="embed-responsive embed-responsive-4by3">
                        <iframe class="embed-responsive-item" src="https://screencast-o-matic.com/embed?sc=<?= $video['id']; ?>	&v=5&title=0&ff=1&a=1" allowfullscreen="true"></iframe>
                    </div>
                </div>
            </div>
            <div class="row">
                <div>
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