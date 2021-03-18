<?php require __DIR__ . '/bootstrap.php'; ?>
<!doctype html>
<html lang="<?= $video['lang']; ?>">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="<?= $video['desc']; ?>">
        <title><?= $video['title']; ?></title>
        <link href="https://fonts.googleapis.com/css?family=Cabin:600|Quattrocento+Sans:400&display=swap" rel="stylesheet preload prefetch" as="style">
        <link href="../css/player.css" rel="stylesheet" type="text/css">
        <script type="text/javascript" src="../js/gtag.js"></script>
        <script type="text/javascript" src="../js/chat.js"></script>
        <script type="text/javascript" src="../js/fullstory.js"></script>
        <script type="text/javascript" src="../js/logrocket.js"></script>
    </head>
    <body>
        <div class="title">
            <h1><?= $video['title']; ?></h1>
        </div>
        <?php if ($next = $video->next()) : ?>
        <div class="next">
            <a href="<?= $next->slug; ?>"><?= $next->translate(); ?></a>
        </div>
        <?php endif; ?>
        <div class="video">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe src="<?= $video['url']; ?>" allowfullscreen="" style="position: absolute; top: 0; left: 0; bottom: 0; border: 0; width: 100%; height: 100%;"></iframe>
            </div>
        </div>
        <div class="description">
            <h2><?= $video['desc']; ?></h2>
        </div>
        <?php if ($trans = ($video['trans'] ?? false)): ?>
        <div class="transcription">
            <h2><?= $trans['title'] ?></h2>
            <?php foreach ($trans['entries'] as $content): ?>
                <p><?= $content ?></p>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </body>
</html>
