<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit3294db2790fb443d29d4b75aded0a7f4
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'Whoops\\' => 7,
        ),
        'P' => 
        array (
            'Psr\\Log\\' => 8,
        ),
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Whoops\\' => 
        array (
            0 => __DIR__ . '/..' . '/filp/whoops/src/Whoops',
        ),
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/src',
        ),
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/App',
        ),
    );

    public static $prefixesPsr0 = array (
        'B' => 
        array (
            'Bramus' => 
            array (
                0 => __DIR__ . '/..' . '/bramus/router/src',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit3294db2790fb443d29d4b75aded0a7f4::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit3294db2790fb443d29d4b75aded0a7f4::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit3294db2790fb443d29d4b75aded0a7f4::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit3294db2790fb443d29d4b75aded0a7f4::$classMap;

        }, null, ClassLoader::class);
    }
}
