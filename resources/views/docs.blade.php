<!DOCTYPE html>
<html>
    <meta name="csrf-token" content="{{ csrf_token() }}">
<head>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>

<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Elite RPG World</div>
                <div class="panel-body">

                    <div id="app">

                        <example></example>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/app.js') }}"></script>

</body>
</html>
