const userInfo =
    {
        "account": "admin",
        "menuDTOList": [
            {
                "level": 1,
                "name": "系统管理",
                "no": "A",
                "note": null,
                "order": 1,
                "subMenu": [],
                "superMenu": {
                    "level": null,
                    "name": null,
                    "no": "0",
                    "note": null,
                    "order": null,
                    "subMenu": [],
                    "superMenu": null,
                    "uRL": null
                },
                "uRL": null
            },
            {
                "level": 2,
                "name": "用户管理",
                "no": "A01",
                "note": null,
                "order": 1,
                "subMenu": [],
                "superMenu": {
                    "level": null,
                    "name": null,
                    "no": "A",
                    "note": null,
                    "order": null,
                    "subMenu": [],
                    "superMenu": null,
                    "uRL": null
                },
                "uRL": null
            },
            {
                "level": 3,
                "name": "用户信息",
                "no": "A0101",
                "shortcut": true,
                "note": null,
                "order": 1,
                "subMenu": [],
                "superMenu": {
                    "level": null,
                    "name": null,
                    "no": "A01",
                    "note": null,
                    "order": null,
                    "subMenu": [],
                    "superMenu": null,
                    "uRL": null
                },
                "uRL": null
            },
               {
                "level": 3,
                "name": "角色信息",
                "no": "A0102",
                "note": null,
                "order": 2,
                "subMenu": [],
                "superMenu": {
                    "level": null,
                    "name": null,
                    "no": "A01",
                    "note": null,
                    "order": null,
                    "subMenu": [],
                    "superMenu": null,
                    "uRL": null
                },
                "uRL": null
            },
            {
                "level": 3,
                "name": "机构管理",
                "no": "A02",
                "note": null,
                "order": 3,
                "subMenu": [],
                "superMenu": {
                    "level": null,
                    "name": null,
                    "no": "A",
                    "note": null,
                    "order": null,
                    "subMenu": [],
                    "superMenu": null,
                    "uRL": null
                },
                "uRL": null
            }
        ],
        "name": "admin",
        "orgGrade": 0,
        "orgName": null,
        "orgNo": null,
        "retCode": "00",
        "retMsg": "登陆成功",
        "roleCatalog": 1,
        "usrDefView": null,
        "webToken": "57838730B6386D6185F781C4F6ABA340"
    };

    export const USERS = {
        'POST /login': userInfo,
        'GET /curUser': userInfo
    };