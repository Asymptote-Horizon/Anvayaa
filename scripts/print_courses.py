import sqlite3
conn=sqlite3.connect('c:/Users/Omkar/Desktop/anvaya-26 mar 26 v1/backend/anvaya_dev.db')
c=conn.cursor()
c.execute('SELECT id, video_url FROM courses')
rows=c.fetchall()
for r in rows:
    print(r[0], '->', r[1])
conn.close()
