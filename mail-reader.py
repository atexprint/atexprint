import imaplib
import email
from email.header import decode_header
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_APP_PASSWORD = os.getenv("EMAIL_APP_PASSWORD")


def main():
    if EMAIL_SENDER is None or EMAIL_APP_PASSWORD is None:
        print(f"Either EMAIL_SENDER or EMAIL_APP_PASSWORD are not set")
        return

    def clean(text):
        if isinstance(text, bytes):
            return text.decode("utf-8", errors="ignore")
        return text

    def get_body(msg):
        """Extract email body (prefers plain text)."""
        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                content_disposition = str(part.get("Content-Disposition"))

                if (
                    content_type == "text/plain"
                    and "attachment" not in content_disposition
                ):
                    return clean(part.get_payload(decode=True))

            # fallback to HTML
            for part in msg.walk():
                if part.get_content_type() == "text/html":
                    return clean(part.get_payload(decode=True))
        else:
            return clean(msg.get_payload(decode=True))

        return ""

    # connect to Gmail
    imap = imaplib.IMAP4_SSL("imap.gmail.com")
    imap.login(EMAIL_SENDER, EMAIL_APP_PASSWORD)

    # open inbox
    imap.select("INBOX")

    # get all emails
    status, messages = imap.search(None, "ALL")
    email_ids = messages[0].split()

    # last 10 emails
    latest_ids = email_ids[-10:]

    for mail_id in reversed(latest_ids):

        status, msg_data = imap.fetch(mail_id, "(RFC822)")

        for response_part in msg_data:
            if isinstance(response_part, tuple):

                msg = email.message_from_bytes(response_part[1])

                # subject
                subject, encoding = decode_header(msg["Subject"])[0]
                subject = clean(subject)

                # sender
                sender = msg.get("From")

                # date
                date = msg.get("Date")

                # body
                body = get_body(msg)

                print("=" * 80)
                print("From:", sender)
                print("Subject:", subject)
                print("Date:", date)
                print("\nBody:\n")
                print(body[:2000])  # limit large emails
                print("=" * 80)
                print()

    imap.logout()


if __name__ == "__main__":
    main()
