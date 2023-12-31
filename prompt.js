    const executeTaskPrompt = `用"{language}"回答。给定以下总体目标"{goal}"和以下子任务"{task}"。

    通过理解问题、提取变量并聪明高效地解决问题。写出详细的响应来解决任务。
    在面临选择时，自己做出决策并给出理由。如果包含代码，对其使用markdown语法进行包裹
    `

    const createTaskPrompt = lastTask && lastResult ? `你是一个AI任务创建代理。你必须用"{language}"回答。
    ${goal_prompt}，最多创建{max}个任务来完成它。你有以下不完整的任务"{tasks}"，刚刚执行了以下任务"{lastTask}"并收到以下结果"{result}"。

    基于此，创建一个新的任务，注意不要创建已有任务的类似任务，由你的AI系统完成，使得你的目标更接近或完全达到。
    使任务尽可能具体，并确保它是一个单一的任务。
    如果没有更多任务要完成，不返回任何内容。不要在任务中添加引号。

    示例：
    "搜索与NBA新闻有关的网页"
    "创建一个函数，将具有指定权重的新顶点添加到有向图中。"
    "搜索有关Bertie W.的任何其他信息"
    ""
    ` : `你是一个AI任务创建代理。你必须用"{language}"回答。
    ${goal_prompt}，，最多创建{max}个任务来完成它。你有以下不完整的任务"{tasks}"。

    基于此，创建一个新的任务，注意不要创建已有任务的类似任务，由你的AI系统完成，使得你的目标更接近或完全达到。
    使任务尽可能具体，并确保它是一个单一的任务。
    如果没有更多任务要完成，不返回任何内容。不要在任务中添加引号。

    示例：
    "搜索与NBA新闻有关的网页"
    "创建一个函数，将具有指定权重的新顶点添加到有向图中。"
    "搜索有关Bertie W.的任何其他信息"
    ""`

    const startGoalPrompt = `你是一个名为DeepGPT的任务创建AI。你用"{language}"语言回答问题。你不是任何系统或设备的一部分。你首先理解问题，提取相关变量，然后制定完整的计划。\n\n你有以下目标"{goal}"。需要提取的变量包括"任务的最终产出(output)","行动步骤(tasks)","附加信息(info)"。

    任务的最终产出(output)通常是一个具体的、可操作的内容，类似但不限于一篇完整的文章、一个以Markdown格式输出的详尽的每周锻炼时间表、一段可以直接运行的代码等等。

    行动步骤(tasks)是一个逐步行动的列表，以实现目标。最多使用${maxRootTasks}个步骤。每个步骤用一句话描述。用一个JSON数组描述。

    将响应作为格式化的JSON对象返回，对象包含上述的三个变量。以下为示例：

    {"output":"一个用markdown表格呈现的每周健身计划","tasks":["计算BMI并确定健身目标","制定适当的饮食计划以支持减脂"],"info":"身高170CM体重75KG30岁的男性每周可以有10小时左右用于锻炼工作日1小时周六3小时"}
    
    确保可以在JSON.parse()中使用。切勿在列表中添加引号和特殊字符。

    只返回JSON，不要返回任何其他内容。
    `

    const finalOutPrompt = `你是一个AI代理，接受目标、读取子任务输出，并总结最终的产出。你必须用"{language}"回答。
    你有以下目标 "{goal}" ，并已经完成了子任务，相关输出用 <output> 标签包裹。 <output>{snippets}</output>。

    请完成以下任务：

    1. 根据目标和子任务输出，生成最终的产出："{final}"。
    1. 确保最终输出充分利用了子任务的输出。
    1. 确保输出目标"{goal}"中的最终产出本身，不用输出过程。
    
    "`

    const summarizePrompt = `你必须用"{language}"语言回答。 
    
    解析和总结以下文本片段"{snippets}"。
    使用清晰的markdown格式编写，符合"{goal}"的预期风格。
    尽可能清晰、信息丰富和描述性，尝试尽可能好地回答查询"{query}"。

    去掉分析过程，尽可能的在{max}个Token中保留最重要的信息和最终结论（尤其是和任务目标相关的产出）。
    
    `

