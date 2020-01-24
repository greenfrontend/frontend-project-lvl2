const x = [{
    "type": "nested",
    "status": "unchanged",
    "key": "common",
    "value": {
        "setting1": "Value 1",
        "setting2": 200,
        "setting3": true,
        "setting6": {
            "key": "value"
        }
    },
    "children": [{
        "type": "flat",
        "status": "unchanged",
        "key": "setting1",
        "value": "Value 1",
        "children": null
    }, {
        "type": "flat",
        "status": "deleted",
        "key": "setting2",
        "value": 200,
        "children": null
    }, {
        "previousType": "flat",
        "type": "nested",
        "status": "changed",
        "key": "setting3",
        "previousValue": true,
        "value": {
            "key": "value"
        },
        "previousChildren": null,
        "children": [{
            "type": "flat",
            "status": "unchanged",
            "key": "key",
            "value": "value",
            "children": null
        }]
    }, {
        "type": "nested",
        "status": "unchanged",
        "key": "setting6",
        "value": {
            "key": "value"
        },
        "children": [{
            "type": "flat",
            "status": "unchanged",
            "key": "key",
            "value": "value",
            "children": null
        }, {
            "type": "flat",
            "status": "added",
            "key": "ops",
            "value": "vops",
            "children": null
        }]
    }, {
        "type": "flat",
        "status": "added",
        "key": "follow",
        "value": false,
        "children": null
    }, {
        "type": "flat",
        "status": "added",
        "key": "setting4",
        "value": "blah blah",
        "children": null
    }, {
        "type": "nested",
        "status": "added",
        "key": "setting5",
        "value": {
            "key5": "value5"
        },
        "children": [{
            "type": "flat",
            "status": "unchanged",
            "key": "key5",
            "value": "value5",
            "children": null
        }]
    }]
}, {
    "type": "nested",
    "status": "unchanged",
    "key": "group1",
    "value": {
        "baz": "bas",
        "foo": "bar",
        "nest": {
            "key": "value"
        }
    },
    "children": [{
        "previousType": "flat",
        "type": "flat",
        "status": "changed",
        "key": "baz",
        "previousValue": "bas",
        "value": "bars",
        "previousChildren": null,
        "children": null
    }, {
        "type": "flat",
        "status": "unchanged",
        "key": "foo",
        "value": "bar",
        "children": null
    }, {
        "previousType": "nested",
        "type": "flat",
        "status": "changed",
        "key": "nest",
        "previousValue": {
            "key": "value"
        },
        "value": "str",
        "previousChildren": [{
            "type": "flat",
            "status": "unchanged",
            "key": "key",
            "value": "value",
            "children": null
        }],
        "children": null
    }]
}, {
    "type": "nested",
    "status": "deleted",
    "key": "group2",
    "value": {
        "abc": 12345
    },
    "children": [{
        "type": "flat",
        "status": "unchanged",
        "key": "abc",
        "value": 12345,
        "children": null
    }]
}, {
    "type": "nested",
    "status": "added",
    "key": "group3",
    "value": {
        "fee": 100500
    },
    "children": [{
        "type": "flat",
        "status": "unchanged",
        "key": "fee",
        "value": 100500,
        "children": null
    }]
}]