const config = {
    "make_targets": {
        "win32": [
            "squirrel"
        ],
        "darwin": [
            "dmg"
        ],
        "linux": [
            "deb",
            "rpm"
        ]
    },
    "electronPackagerConfig": {
        "packageManager": "npm"
    },
    "electronWinstallerConfig": {
        "name": "paysera_app_fast_enough_workshop"
    },
    "electronInstallerDebian": {},
    "electronInstallerRedhat": {}
};
