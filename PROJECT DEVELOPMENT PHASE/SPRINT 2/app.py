from flask import Flask,render_template,request,session, redirect,url_for
import ibm_db


app = Flask(__name__)
app.secret_key='vy@ur434'
#def connection():
# try:
conn = ibm_db.connect("DATABASE=bludb;HOSTNAME=19af6446-6171-4641-8aba-9dcff8e1b6ff.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;PORT=30699;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=mrv82327;PWD=lUMrTlKQrEqCFg7b",'','')
print(conn)
print("connection successful...")
 # return conn
 #except:
  #print("Not Connected to Database")


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contacts')
def contacts():
    return render_template('contacts.html')

@app.route('/forgot')
def forgot():
    return render_template('forgotten-password.html')

@app.route('/signup', methods=['POST','GET'])
def signup():
    if request.method == 'POST':
        # conn = connection()
         try:
            sql = "INSERT INTO users VALUES('{}','{}','{}','{}')".format(request.form["name"],request.form["email"],request.form["phone"],request.form["password"])
            ibm_db.exec_immediate(conn,sql)
            #flash("successfully Registered !")
            return render_template('login.html')
         except:
            #flash("Account already exists! ")
            return render_template('signup.html')
    else:
            return render_template('signup.html')
        # name = request.form['name']
         #email = request.form['email']
         #phone = request.form['phone']
         #password = request.form['password']
        
         #sql ="INSERT INTO users VALUES (?,?,?,?)"
         #stmt = ibm_db.prepare(conn,sql)
         #ibm_db.bind_param(stmt, 1, name)
         #ibm_db.bind_param(stmt, 2, email)
         #ibm_db.bind_param(stmt, 3, phone)
         #ibm_db.bind_param(stmt, 4, password)
         #ibm_db.execute(stmt)
   # return render_template('signup.html')

@app.route('/login', methods=['POST','GET'])
def login():
     if request.method == 'POST':
       # conn =connection()
        email = request.form["email"]
        password = request.form["password"]
        sql = "SELECT COUNT(*) FROM users WHERE EMAIL=? AND PASSWORD=?"
        stmt = ibm_db.prepare(conn,sql)
        ibm_db.bind_param(stmt, 1, email)
        ibm_db.bind_param(stmt, 2, password)
        ibm_db.execute(stmt)
        res = ibm_db.fetch_assoc(stmt)
        if res['1'] == 1:
            session['loggedin'] = True
            session['email'] = email
            return render_template('userpage.html')
        else:
            #flash("email/ Password isincorrect! ")
            return render_template('login.html')
     else:
            return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('username', None)
    return redirect(url_for('login'))

        #email = request.form['email']
        #password = request.form['password']
  

        #sql = "SELECT * FROM users WHERE email=%s AND password=%s"
        #stmt = ibm_db.prepare(conn, sql)
        #ibm_db.bind_param(stmt,1,email)
        #ibm_db.bind_param(stmt,2,password)
       # user = ibm_db.execute(stmt).fetchone()
        
  #    return render_template('login.html' ,msg="success")

if __name__=='__main__':
    app.config['SESSION_TYPE']= 'filesystem'
    app.run(debug=True)
