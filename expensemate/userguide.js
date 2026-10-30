const USER_GUIDE_DATA = [
  {
    "title": "Getting Started & Basics",
    "icon": "play_circle_outline_rounded",
    "items": [
      {
        "id": "add_tx",
        "question": "How do I add an expense, income, or transfer?",
        "keywords": [
          "add",
          "expense",
          "income",
          "transfer",
          "record",
          "new"
        ],
        "answer": "To add a transaction:\n1. Tap the **Add** tab from the bottom navigation bar.\n2. Select the transaction type: **Expense**, **Income**, or **Transfer**.\n3. Enter the amount using the numeric keypad or custom calculator.\n4. Select the **Account** and **Category** (or destination account for Transfers).\n5. Optionally add notes, adjust date, or modify the time.\n6. Tap the **Add** button.\n\n**Helpful Defaults:**\n• **Type** defaults to **Expense**.\n• **Account** and **Category** default to your first item in their managed lists. Reorder them in Manage Accounts/Categories to set your preferred defaults!\n• **Date & Time** default to the current moment."
      },
      {
        "id": "edit_delete_tx",
        "question": "How do I edit or delete an existing transaction?",
        "keywords": [
          "edit",
          "delete",
          "remove",
          "modify",
          "update",
          "undo"
        ],
        "answer": "To modify or delete a transaction:\n• Find the transaction on the **Home** or **Expense History (View All)** page.\n• Tap on the transaction card to open its action bottom sheet.\n• Tap **Edit** to modify amount, category, account, date, or notes, then tap **Update**.\n• Tap **Delete** and confirm. The transaction is safely moved to the **Trash** bin.\n• An **Undo** snackbar will appear for 5 seconds allowing you to immediately restore it if deleted by mistake."
      },
      {
        "id": "search_filter_tx",
        "question": "How do I search and filter through my transactions?",
        "keywords": [
          "search",
          "filter",
          "history",
          "find",
          "range",
          "keyword"
        ],
        "answer": "ExpenseMate offers robust search and multi-criteria filtering:\n• **Search Bar**: Tap the search icon on the Home page to filter transactions instantly by note keyword, category, or account name.\n• **Filter Screen**: In **View All Transactions**, tap the **Filter** icon to apply detailed criteria:\n  • Filter by **Type** (Expense, Income, Transfer)\n  • Filter by **Account** and **Category**\n  • Filter by **Date Range** (Month, Year, Custom Period, or All)\n  • Filter by **Amount Range** (Minimum and Maximum amount)\n• Filter by **Time Range** (Morning, Evening, etc.)"
      },
      {
        "id": "sort_tx",
        "question": "How does sorting work in Expense History?",
        "keywords": [
          "sort",
          "order",
          "ascending",
          "descending",
          "amount",
          "date"
        ],
        "answer": "In the **View All (History)** page, you can customize your view:\n• **Sort by Date**: Displays transactions grouped by Today, This Week, This Month, This Year, and Older.\n• **Sort by Amount**: Arranges all transactions strictly by value.\n• **Toggle Order**: Tap the circular arrow button next to the dropdown to switch between **Descending** (highest / newest first) and **Ascending** (lowest / oldest first)."
      },
      {
        "id": "voice_assistant_logging",
        "question": "How do I add transactions using the AI Voice Assistant?",
        "keywords": [
          "voice",
          "speak",
          "speech",
          "mic",
          "microphone",
          "ai",
          "logging",
          "say"
        ],
        "answer": "ExpenseMate includes a smart AI Voice Assistant to log expenses, income, and transfers hands-free:\n1. Tap the **Microphone** button on the bottom navigation bar or top app bar.\n2. Speak naturally in conversational language. For example:\n   • *\"Spent 250 on groceries from HDFC\"*\n   • *\"Paid 50 rupees for coffee via Cash\"*\n   • *\"Lent 1000 to Alex from Savings\"*\n   • *\"Received 50000 salary into Bank\"*\n3. The AI assistant parses the speech to automatically extract the **Amount**, **Type** (Expense, Income, Transfer), **Category**, **Subcategory**, **Account**, and **Debt Friend**.\n4. Review the detected details on the preview card and tap **Confirm** to save immediately!"
      },
      {
        "id": "account_insights_how",
        "question": "How do I view Account Insights and account-specific activity?",
        "keywords": [
          "account insights",
          "account details",
          "long press account",
          "inflow",
          "outflow",
          "top category"
        ],
        "answer": "You can inspect comprehensive analytics for any account with a single gesture:\n• **Press and hold (long-press)** any account card or chip on the **Add** page, **Manage Accounts**, or **Stats** screen.\n• The **Account Insights** bottom sheet displays:\n  • **Total Inflow & Outflow** for the current month\n  • **Top Spending Category** associated with this specific account\n  • **Total Transaction Count** and maximum single transaction value\n• A scrollable list of recent transactions under this account with quick shortcuts to edit or delete entries!"
      }
    ]
  },
  {
    "title": "Categories & Subcategories",
    "icon": "category_outlined",
    "items": [
      {
        "id": "subcategories_intro",
        "question": "What are Subcategories and how do they work?",
        "keywords": [
          "subcategory",
          "subcategories",
          "sub category",
          "nesting",
          "breakdown",
          "detailed"
        ],
        "answer": "Subcategories allow you to break down broad categories into specific spending areas for deeper clarity:\n• Examples: Under **Food**, track *Groceries*, *Dining Out*, and *Coffee*. Under **Transportation**, track *Fuel*, *Parking*, and *Maintenance*.\n• When you select a category during transaction entry, its assigned subcategories appear as compact chips directly below the category.\n• Transactions record both the parent Category and the Subcategory, allowing granular search, filtering, and export."
      },
      {
        "id": "subcategories_add_manage",
        "question": "How do I add, rename, or delete subcategories?",
        "keywords": [
          "add subcategory",
          "delete subcategory",
          "rename subcategory",
          "manage subcategory"
        ],
        "answer": "Managing subcategories is quick and seamless:\n• **Add on the fly**: When creating an expense, select your category and scroll to the end of the subcategories row. Tap the **+ Add** chip, type the new name, and it is instantly saved and selected!\n• **Rename or Delete**: **Long-press** any subcategory chip to open its management modal:\n  • Tap **Rename** to update the subcategory across existing records.\n• Tap **Delete Subcategory** to remove it. You can choose whether to keep linked transactions under the parent category or delete them."
      },
      {
        "id": "subcategories_settings_toggle",
        "question": "How do I enable or disable Subcategories?",
        "keywords": [
          "enable subcategories",
          "disable subcategories",
          "turn off subcategory",
          "settings subcategories"
        ],
        "answer": "If you prefer a simpler interface without secondary tags:\n• Go to **Settings > Subcategories**.\n• Toggle the switch OFF to hide the subcategory selector from the Add and Edit transaction screens.\n• Existing historical transactions will safely preserve their subcategory labels, and re-enabling the feature restores them immediately."
      },
      {
        "id": "manage_categories_grid",
        "question": "How do I organize, reorder, or customize categories?",
        "keywords": [
          "manage categories",
          "reorder categories",
          "category grid",
          "category icon"
        ],
        "answer": "In **Manage Categories** (accessible from the sidebar):\n• View your categories in a sleek grid displaying icons, transaction counts, and monthly spending progress bars.\n• Tap the **Search** icon in the app bar to quickly filter categories by name.\n• Tap the **Reorder** icon to drag and drop categories into your preferred order. The top categories automatically become your default selections on the Add screen!\n• Tap the edit pencil on any category to change its name, choose from 100+ icons, or set a monthly spending limit."
      }
    ]
  },
  {
    "title": "Split with Friends & Debts",
    "icon": "group_outlined",
    "items": [
      {
        "id": "direct_friend_lending",
        "question": "How do I lend money directly to a friend?",
        "keywords": [
          "lend",
          "loan",
          "borrow",
          "lend money",
          "lent to friend",
          "debt friend",
          "give money"
        ],
        "answer": "You can record a loan to a friend in two easy ways:\n1. **From Add Transaction**:\n   • Select **Transfer** as the transaction type.\n   • Choose your payment account (e.g., Bank Account or Cash).\n   • Select **Debt** as the destination account.\n   • The **Lent to Friend** selector will appear. Choose the friend who borrowed the money, or tap **+ Add** to add a new friend immediately.\n   • Tap **Add** to record the loan.\n2. **From Manage Friends**:\n   • Open **Sidebar > Split Friend Data**.\n   • Tap on the friend's card to open **Friend Insights**.\n• Tap the **Lend Money** button at the bottom of the sheet, enter the amount, and confirm!"
      },
      {
        "id": "friend_insights_tracking",
        "question": "What is Friend Insights and how do I track what friends owe me?",
        "keywords": [
          "friend insights",
          "money owed",
          "friend balance",
          "who owes me",
          "track friend debt"
        ],
        "answer": "The **Friend Insights** sheet is a centralized hub for all financial exchanges with a specific friend:\n• In **Sidebar > Split Friend Data**, tap on any friend's card to open their insights.\n• **Owed Banner**: Highlights whether all debts are settled or how much the friend currently owes you.\n• **All Transactions**: Displays a dedicated, scrollable list of every loan, split share, and repayment associated with that friend.\n• **Direct Actions**: Tap on any transaction in the list to edit or delete it, use **Lend Money** to record a new loan, or tap **Settle All Debts** to clear the balance."
      },
      {
        "id": "settle_debts_options",
        "question": "How do I settle a loan when a friend repays me?",
        "keywords": [
          "settle",
          "repay",
          "paid back",
          "settle all debts",
          "unsettled",
          "clear loan"
        ],
        "answer": "ExpenseMate supports both individual and bulk debt settlement:\n• **Individual Transaction Settlement**:\n  • Tap on any debt transaction card (marked with an amber unsettled badge).\n  • In the transaction details sheet, tap **Settle this debt** (or reopen a settled debt).\n  • A confirmation sheet details the exact balance adjustment (your primary account balance increases and the loan is marked settled).\n• **Settle All Debts at Once**:\n  • Open **Friend Insights** for that friend.\n  • If there is an outstanding balance, tap the **Settle All Debts** button at the bottom.\n• Confirm in the dialog. All pending loans with that friend are instantly marked as settled in one step!"
      },
      {
        "id": "split_friend_how",
        "question": "How does the 'Split with Friend' feature work for shared bills?",
        "keywords": [
          "split",
          "friend",
          "debt",
          "share",
          "divide",
          "bill",
          "iou",
          "restaurant"
        ],
        "answer": "Split with Friend allows you to divide dining, rent, or grocery bills:\n1. On the **Add** transaction screen, tap the **...** (three-dot options) button.\n2. Select **Split with Friend**.\n3. Enter the total bill amount and select which friends shared the expense.\n4. Choose equal split, exact amounts, or share ratios.\n5. **Your share** is logged as an actual Expense under your selected category.\n6. **Friends' shares** are automatically recorded as Transfers into the dedicated **Debt** account linked to each friend so you can track who owes what!"
      },
      {
        "id": "manage_friends_crud",
        "question": "What happens when I rename or delete a friend?",
        "keywords": [
          "rename friend",
          "delete friend",
          "cascade delete",
          "friend transactions"
        ],
        "answer": "ExpenseMate provides full relational integrity when editing or removing friends:\n• **Renaming a Friend**: In **Split Friend Data**, tap Edit on the friend card or inside Friend Insights. Renaming automatically updates all historical debt transactions linked to that friend.\n• **Deleting a Friend**: When you tap Delete, a safety confirmation dialog displays the exact count of transactions linked to that friend with a **View All Transactions** preview button. Confirming deletion safely cleans up the friend and their linked transactions, automatically restoring your account balances!"
      },
      {
        "id": "manage_friends",
        "question": "How do I add, rename, or reorder friends in Manage Friends?",
        "keywords": [
          "friend",
          "manage",
          "add friend",
          "reorder",
          "delete friend"
        ],
        "answer": "To manage your friends list:\n• Open the Sidebar navigation drawer and tap **Split Friend Data**.\n• Tap **+ Add Friend** (or the FAB button) to save a new contact name.\n• Tap the edit pencil icon to rename a friend.\n• Toggle **Reorder Mode** to drag and drop friends so your most frequent split partners appear first during bill splitting and debt tracking."
      }
    ]
  },
  {
    "title": "Trash & Data Recovery",
    "icon": "delete_outline_rounded",
    "items": [
      {
        "id": "trash_how",
        "question": "What is the Trash (Recycle Bin) and how does it protect my data?",
        "keywords": [
          "trash",
          "bin",
          "recycle",
          "restore",
          "recover",
          "accidental"
        ],
        "answer": "To prevent accidental data loss, ExpenseMate features a built-in **Trash Bin**:\n• When you delete any transaction, it is moved to Trash rather than permanently erased.\n• You can review all deleted items, inspect their deletion timestamp, and restore them anytime.\n• Trashed transactions do not count towards your monthly spend, budget, or active account balances."
      },
      {
        "id": "restore_trash",
        "question": "How do I restore a deleted transaction from Trash?",
        "keywords": [
          "restore",
          "undelete",
          "recover trash",
          "bring back"
        ],
        "answer": "To restore an entry:\n1. Open the sidebar navigation menu.\n2. Tap **Trash**.\n3. Tap on the deleted transaction card.\n4. Review the details and tap **Restore**.\n5. The transaction is instantly reinstated into your database, restoring its original account balance and category totals!"
      },
      {
        "id": "trash_retention",
        "question": "How long are deleted items kept in Trash?",
        "keywords": [
          "retention",
          "expiry",
          "auto delete",
          "trash days",
          "purge"
        ],
        "answer": "You have full control over Trash retention:\n• In **Trash**, tap the retention settings pill.\n• Choose between **7 Days** (default), **14 Days**, **30 Days**, **60 Days**, **90 Days**, or **Never (Keep Indefinitely)**.\n• Expired entries beyond your retention window are automatically cleaned up to keep your local database lightweight."
      }
    ]
  },
  {
    "title": "Budgets & Spending Pace",
    "icon": "track_changes_rounded",
    "items": [
      {
        "id": "budget_monthly_yearly",
        "question": "How do Monthly and Yearly Budgets work?",
        "keywords": [
          "budget",
          "monthly budget",
          "yearly budget",
          "limit",
          "target"
        ],
        "answer": "ExpenseMate offers comprehensive multi-tiered budgeting:\n• Navigate to the **Budget** tab.\n• **Monthly Budgets**: Set specific budget targets for each month (e.g., higher for festival or travel months).\n• **Yearly Budget**: Set an overall annual spending ceiling.\n• The top summary card provides real-time progress:\n  • **Spent so far** vs **Total Budget**\n  • **Remaining Balance**\n• Dynamic color status: Teal (On Track <60%), Orange (Warning 60-85%), Red (Critical >85%)."
      },
      {
        "id": "category_limits",
        "question": "Can I set monthly spending limits on individual categories?",
        "keywords": [
          "category limit",
          "cap",
          "monthly limit",
          "food limit"
        ],
        "answer": "Yes! Setting category limits helps you curb impulsive spending:\n• Go to **Manage Categories** from the sidebar.\n• Tap the edit pencil on any category (e.g. Dining, Shopping).\n• Enter your desired **Monthly Limit** and tap Save.\n• When adding transactions or viewing category insights, ExpenseMate displays an animated progress bar showing your remaining allowance."
      },
      {
        "id": "category_insights",
        "question": "How do I access Category Insights & spending history?",
        "keywords": [
          "insights",
          "long press",
          "category details",
          "spent"
        ],
        "answer": "You can inspect deep insights for any category with one gesture:\n• **Press and hold (long-press)** any category card in **Manage Categories**, **Budget**, or from the **Category Dropdown** selector.\n• The **Category Insights** modal sheet will slide up displaying:\n  • Current month total spending & monthly limit progress\n  • Remaining budget allowance\n  • Transaction count in this category\n• A scrollable list of recent transactions under this category with instant edit/delete shortcuts!"
      }
    ]
  },
  {
    "title": "Customization & Modern UI",
    "icon": "palette_outlined",
    "items": [
      {
        "id": "dropdown_category_selector",
        "question": "How do I enable the Frosted Glass Category Dropdown?",
        "keywords": [
          "dropdown",
          "category selector",
          "glass",
          "frosted",
          "selector"
        ],
        "answer": "ExpenseMate supports two category selection experiences:\n1. **Horizontal Chip Selector**: Classic horizontal scrollable chips.\n2. **Frosted Glass Dropdown**: Modern compact selector with built-in search, frosted glass blur, and long-press category insights.\n• To toggle between them, go to **Settings** > **Dropdown Category Selector** and turn the switch ON or OFF."
      },
      {
        "id": "glass_ui_feature",
        "question": "What is Frosted Glass UI and how do I enable it?",
        "keywords": [
          "glassmorphism",
          "frosted",
          "blur",
          "glass ui",
          "translucent"
        ],
        "answer": "Frosted Glass UI provides an ultra-modern aesthetic with background blur (glassmorphism), translucency, and radial specular highlights across cards, modals, and tab bars.\n• Go to **Settings** > **Glass UI** and toggle it ON.\n• Works seamlessly in both Light and Dark themes!"
      },
      {
        "id": "theme_color_customization",
        "question": "How do I change the App Theme and Accent Color?",
        "keywords": [
          "theme",
          "dark mode",
          "light mode",
          "color",
          "accent",
          "rgb"
        ],
        "answer": "Customize ExpenseMate to match your style:\n• **Theme Mode**: Go to **Settings > Theme Mode** to select **Dark**, **Light**, or **System Default**.\n• **Accent Color**: Go to **Settings > Accent Color**. Choose from curated designer palettes (Emerald Teal, Sapphire Blue, Amethyst Purple, Crimson Coral) or open the **RGB Custom Color Picker** to select any color code!"
      },
      {
        "id": "currency_precision_numbering",
        "question": "How do I change Currency, Decimal Precision, or Numbering System?",
        "keywords": [
          "currency",
          "symbol",
          "decimal",
          "rupee",
          "dollar",
          "lakh",
          "million"
        ],
        "answer": "In **Settings > Primary Currency**, you can customize:\n• **Currency**: Select from 30+ world currencies (₹ INR, \\$ USD, € EUR, £ GBP, ¥ JPY, etc.).\n• **Decimal Precision**: Choose 0, 1, or 2 decimal places (e.g. ₹1,250 vs ₹1,250.00).\n• **Numbering Format**: Choose between **Indian format** (Lakhs & Crores: 1,00,000) or **International format** (Millions & Billions: 100,000)."
      }
    ]
  },
  {
    "title": "Android Home Screen Widgets",
    "icon": "widgets_outlined",
    "items": [
      {
        "id": "widgets_available",
        "question": "Does ExpenseMate have Android Home Screen Widgets?",
        "keywords": [
          "widget",
          "home screen",
          "android widget",
          "quick access"
        ],
        "answer": "Yes! ExpenseMate includes interactive home screen widgets:\n1. **Month Summary Widget**: Shows your current month Income, Expense, Net Balance, and quick-add shortcut buttons right on your home screen.\n2. **Weekly Expense Graph Widget**: Displays a mini bar graph of your daily spending across Monday through Sunday with live week totals.\n3. Both widgets stay in sync with your active account filters and primary currency!"
      },
      {
        "id": "pin_widgets",
        "question": "How do I add ExpenseMate widgets to my phone's home screen?",
        "keywords": [
          "pin widget",
          "add widget",
          "launcher",
          "desktop"
        ],
        "answer": "There are two easy ways to add widgets:\n• **Direct from App**: Go to **Settings > Home Screen Widgets** and tap **Pin to Home Screen** on either widget.\n• **From Android Launcher**: Long-press any empty space on your Android home screen, tap **Widgets**, search for **ExpenseMate**, and drag your desired widget into position."
      },
      {
        "id": "widget_sync",
        "question": "How do widgets refresh and stay updated?",
        "keywords": [
          "sync widget",
          "update widget",
          "refresh",
          "realtime"
        ],
        "answer": "Widgets update automatically whenever you add, edit, or delete a transaction inside the app.\n• You can also tap the **Sync/Refresh icon** directly on the home screen widget to trigger an immediate background refresh without opening the app!"
      }
    ]
  },
  {
    "title": "Charts, Analytics & Net Worth",
    "icon": "bar_chart_rounded",
    "items": [
      {
        "id": "charts_available",
        "question": "What charts and visual reports are available?",
        "keywords": [
          "charts",
          "graph",
          "bar graph",
          "line chart",
          "stats",
          "visual"
        ],
        "answer": "ExpenseMate offers diverse visualization tools:\n• **Line Chart & Bar Graph**: Available on both **Home** (current month spending curve) and **Stats** (month-by-month historical comparison).\n• **Category Pie Chart**: On the Stats tab, view percentage breakdowns of where your money went across categories.\n• **Interactive Calendar View**: In Stats, inspect daily spending directly on a calendar grid with color-coded spending pace badges."
      },
      {
        "id": "pie_chart_interaction",
        "question": "Can I tap on the Pie Chart to inspect transactions?",
        "keywords": [
          "pie chart",
          "tap slice",
          "category transactions",
          "breakdown"
        ],
        "answer": "Yes! The Pie Chart is interactive:\n• Tap any category slice to highlight it and view its exact percentage and spent amount.\n• Tap **View Transactions** below the chart to open a bottom sheet showing every transaction recorded under that category for the selected date range!"
      },
      {
        "id": "net_worth_overview",
        "question": "What is the Lifetime Overview & Net Worth in Stats?",
        "keywords": [
          "net worth",
          "lifetime",
          "total balance",
          "assets",
          "savings"
        ],
        "answer": "Scroll to the bottom of the **Stats** tab to see your **Lifetime Overview**:\n• Displays your total cumulative Income earned, total Lifetime Expenses, and current **Net Worth** (combined balance across all your bank and cash accounts).\n• You can filter which accounts are included in Net Worth calculation via **Settings > Account Filters**."
      },
      {
        "id": "calendar_grid",
        "question": "How do I use the Interactive Calendar View?",
        "keywords": [
          "calendar",
          "calendar view",
          "daily pace",
          "days"
        ],
        "answer": "On the **Stats** tab, switch the view to **Calendar**:\n• See your daily expenses printed on every date tile.\n• Tiles are color-coded based on your daily budget pace (Green = Under pace, Red = Over pace).\n• Tap on any calendar day to open a sheet showing all transactions that occurred on that specific date!"
      }
    ]
  },
  {
    "title": "Recurring Subscriptions & Amortization",
    "icon": "repeat_rounded",
    "items": [
      {
        "id": "recurring_how",
        "question": "How do I schedule a recurring payment (rent, subscriptions, EMIs)?",
        "keywords": [
          "recurring",
          "subscription",
          "emi",
          "rent",
          "automatic",
          "repeat"
        ],
        "answer": "To automate recurring expenses:\n1. On the **Add** tab, enter the amount, account, and category.\n2. Tap the **...** (three-dot) options button.\n3. Select **Recurring Payment**.\n4. Choose the frequency: **Daily**, **Weekly**, or **Monthly**.\n5. Choose the start date and select whether to add the first instance instantly.\n6. Tap **Confirm Add**.\n• When due, ExpenseMate automatically logs the payment upon opening the app without requiring manual entry!"
      },
      {
        "id": "manage_recurring",
        "question": "Where can I view or cancel active recurring payments?",
        "keywords": [
          "cancel recurring",
          "manage recurring",
          "stop subscription"
        ],
        "answer": "To manage your recurring subscriptions:\n• Open the Sidebar navigation drawer and select **Recurring Payment**.\n• View all active recurring schedules, their next due dates, and frequency.\n• Tap the delete icon on any recurring schedule to cancel future automated entries."
      },
      {
        "id": "split_months_amortization",
        "question": "What is 'Split Across Months' (Expense Amortization)?",
        "keywords": [
          "split across months",
          "amortize",
          "annual",
          "insurance",
          "gym"
        ],
        "answer": "Split Across Months is ideal for large upfront payments like annual insurance, gym memberships, or flight tickets:\n1. On the **Add** tab, enter the full amount (e.g. ₹12,000 for a 12-month membership).\n2. Tap the **...** button and select **Split Across Months**.\n3. Choose the duration (e.g. 12 months).\n4. Tap **Confirm Add**.\n5. ExpenseMate distributes the cost evenly (e.g. ₹1,000/month) across each future month so your monthly budget and analytics aren't distorted!"
      }
    ]
  },
  {
    "title": "Data Backup, Import & Export",
    "icon": "import_export_rounded",
    "items": [
      {
        "id": "export_excel_pdf",
        "question": "How do I export my data to Excel (.xlsx) or PDF?",
        "keywords": [
          "export",
          "excel",
          "pdf",
          "statement",
          "download",
          "sheet"
        ],
        "answer": "To export your records:\n1. Go to **Settings** > **Export Data**.\n2. Select your desired Date Range: **This Month**, **This Year**, **Custom Period**, or **All Time**.\n3. Tap **Export to Excel** (.xlsx) for spreadsheets and spreadsheets backups.\n4. Tap **Download PDF Statement** for clean, printable financial statements complete with income/expense color highlights and summaries."
      },
      {
        "id": "import_excel",
        "question": "How do I import transactions from an Excel file?",
        "keywords": [
          "import",
          "excel",
          "restore",
          "upload",
          "template",
          "csv"
        ],
        "answer": "To import existing transaction records:\n1. Go to **Settings** > **Import Data**.\n2. Tap **Download Template File** to inspect the required format (Type, Amount, FromAccount, Category, Note, Date, Time).\n3. Fill your transaction records into the template.\n4. Tap **Import** and select the completed file.\n5. Review the validation summary (valid entries, warnings for new accounts/categories, and errors).\n6. Tap **Confirm Import** to load them into your database!"
      },
      {
        "id": "offline_privacy",
        "question": "Is my data stored in the cloud or shared with third parties?",
        "keywords": [
          "privacy",
          "cloud",
          "offline",
          "secure",
          "local",
          "tracking"
        ],
        "answer": "**No! Your financial privacy is 100% guaranteed:**\n• All your financial data is **stored strictly offline on your device**.\n• All records, transactions, account balances, and budgets are stored locally on your device in a private SQLite database.\n• We do not operate any user databases, cloud tracking, or third-party data analytics. Your finances remain entirely yours!"
      }
    ]
  },
  {
    "title": "Security & Biometrics",
    "icon": "fingerprint_rounded",
    "items": [
      {
        "id": "biometric_lock",
        "question": "How do I enable Biometric Screen Lock?",
        "keywords": [
          "biometric",
          "fingerprint",
          "face unlock",
          "security",
          "lock",
          "pin"
        ],
        "answer": "To protect your finances from prying eyes:\n• Go to **Settings** > **Biometric Lock**.\n• Toggle the switch ON and authenticate with your fingerprint or face.\n• Whenever you launch ExpenseMate, the app will require biometric authentication before granting access to your transactions!"
      },
      {
        "id": "biometric_fallback",
        "question": "What happens if biometric unlock fails or is unavailable?",
        "keywords": [
          "biometric fail",
          "device pin",
          "passcode",
          "fallback"
        ],
        "answer": "If your fingerprint or face is not recognized, you can authenticate using your device's primary screen lock PIN, pattern, or system password as a fallback."
      }
    ]
  },
  {
    "title": "Financial Tips & Best Practices",
    "icon": "account_balance_wallet_outlined",
    "items": [
      {
        "id": "best_practices_accounts",
        "question": "What is the recommended account structure?",
        "keywords": [
          "account setup",
          "cash",
          "bank",
          "savings",
          "structure"
        ],
        "answer": "For accurate ledger tracking, create accounts mirroring your real financial life:\n• **Primary Bank Account**: For your main checking account where salary arrives and UPI payments originate.\n• **Cash in Hand**: For physical currency and wallet cash.\n• **Savings / Emergency Fund**: For long-term emergency reserves.\n• **Credit Card**: For tracking revolving credit card balances."
      },
      {
        "id": "credit_card_tracking",
        "question": "What is the best way to track Credit Card expenses and bill payments?",
        "keywords": [
          "credit card",
          "bill payment",
          "cc",
          "debt",
          "settlement"
        ],
        "answer": "Follow this double-entry best practice:\n1. **Purchases**: When you swipe your card, add an **Expense** with **From Account** set to your **Credit Card** account.\n2. **Bill Payment**: When you pay your monthly credit card statement, log a **Transfer** from your **Bank Account** to your **Credit Card** account.\n• This ensures your bank balance is reduced only when real money leaves your account, and expenses are categorized at the time of purchase!"
      },
      {
        "id": "investment_tracking",
        "question": "How should I log investments (Mutual Funds, Stocks, Gold)?",
        "keywords": [
          "investments",
          "stocks",
          "mutual funds",
          "gold",
          "sip"
        ],
        "answer": "Investments are wealth transfers, not expenses!\n• Create accounts called **Stocks**, **Mutual Funds**, or **Gold**.\n• When investing (e.g. SIP or stock purchase), log a **Transfer** from your **Bank** account to your **Mutual Funds** account.\n• This lowers your spending cash while preserving your total **Net Worth** without skewing your monthly living expense reports!"
      }
    ]
  }
];
