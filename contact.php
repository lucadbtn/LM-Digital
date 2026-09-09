<?php
declare(strict_types=1);

// Empfänger-Adresse für Anfragen aus dem Kontaktformular.
// Bitte durch die echte Adresse ersetzen, bevor die Seite live geht.
const RECIPIENT = 'kontakt@luma-digital.de';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    $data = $_POST;
}

function field(array $data, string $key): string
{
    $value = isset($data[$key]) ? (string) $data[$key] : '';
    // Header-Injection verhindern: Zeilenumbrüche aus Eingaben entfernen.
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

$name = field($data, 'name');
$email = field($data, 'email');
$company = field($data, 'company');
$phone = field($data, 'phone');
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige Anfrage.']);
    exit;
}

$subject = 'Neue Kontaktanfrage über luma-digital.de';

$body = "Neue Anfrage über das Kontaktformular:\n\n"
    . "Name: {$name}\n"
    . "E-Mail: {$email}\n"
    . "Unternehmen: " . ($company !== '' ? $company : '-') . "\n"
    . "Telefon: " . ($phone !== '' ? $phone : '-') . "\n\n"
    . "Nachricht:\n{$message}\n";

$headers = [
    'From: no-reply@luma-digital.de',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail(RECIPIENT, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(502);
    echo json_encode(['error' => 'Nachricht konnte nicht gesendet werden.']);
    exit;
}

echo json_encode(['ok' => true]);
