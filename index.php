<?php

$challenges = [
    'addition' => [
        'description' => 'Create a function which could return the sum of two numbers.',
        'test_cases' => [
            ['arguments' => [15, 17], 'result' => 32],
            ['arguments' => [-87, 87], 'result' => 0],
            ['arguments' => [0.00001, 0.00002], 'result' => 0.00003],
        ],
    ],
];

if (!isset($_GET['challenge'])) {
    header('Content-Type: application/json');
    echo json_encode($challenges);
    return;
}

$challenge = $challenges[$_GET['challenge']];

foreach ($challenge['test_cases'] as $testCase) {
    // todo: run JS code and check if test case passes
    $result = null;
    if ($result !== $testCase['result']) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['error' => sprintf('Expected %s but got %s', $testCase['result'], $result)]);
        return;
    }
}

header('Content-Type: application/json');
echo json_encode(['status' => 'success']);
